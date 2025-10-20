import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface Department {
  id: string;
  name: string;
}

interface Teacher {
  id: string;
  name: string;
  teacherId: string;
  departmentId: string;
  departmentName: string;
  rank: string;
  email: string;
  phone: string;
  office: string;
  hireDate: string;
  status: 'active' | 'onLeave' | 'resigned';
  courseCount: number;
  studentCount: number;
  password?: string; // 添加密码字段
}

interface TeacherAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newTeacher: Partial<Teacher>;
  setNewTeacher: React.Dispatch<React.SetStateAction<Partial<Teacher>>>;
  departments: Department[];
  onAddTeacher: () => void;
  isSubmitting?: boolean;
}

const TeacherAddDialog: React.FC<TeacherAddDialogProps> = ({
  open,
  onOpenChange,
  newTeacher,
  setNewTeacher,
  departments,
  onAddTeacher,
  isSubmitting = false
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>添加教师</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">
              姓名 <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              value={newTeacher.name || ""}
              onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
              className="col-span-3"
              placeholder="请输入教师姓名"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="teacherId" className="text-right text-sm font-medium">
              工号 <span className="text-red-500">*</span>
            </label>
            <Input
              id="teacherId"
              value={newTeacher.teacherId || ""}
              onChange={(e) => setNewTeacher({ ...newTeacher, teacherId: e.target.value })}
              className="col-span-3"
              placeholder="请输入教师工号"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="password" className="text-right text-sm font-medium">
              密码 <span className="text-red-500">*</span> (至少6位)
            </label>
            <Input
              id="password"
              type="password"
              value={newTeacher.password || ""}
              onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
              className="col-span-3"
              placeholder="请输入教师密码"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="department" className="text-right text-sm font-medium">
              所属学院 <span className="text-red-500">*</span>
            </label>
            <Select
              value={newTeacher.departmentId || ""}
              onValueChange={(value) => {
                const selectedDepartment = departments.find(dept => dept.id === value);
                setNewTeacher({
                  ...newTeacher,
                  departmentId: value,
                  departmentName: selectedDepartment?.name || ""
                });
              }}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="选择所属学院" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* 其他表单字段... */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="rank" className="text-right text-sm font-medium">
              职称 <span className="text-red-500">*</span>
            </label>
            <Select
              value={newTeacher.rank || ""}
              onValueChange={(value) => setNewTeacher({ ...newTeacher, rank: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="选择职称" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="教授" value="教授">教授</SelectItem>
                <SelectItem key="副教授" value="副教授">副教授</SelectItem>
                <SelectItem key="讲师" value="讲师">讲师</SelectItem>
                <SelectItem key="助教" value="助教">助教</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right text-sm font-medium">
              邮箱
            </label>
            <Input
              id="email"
              value={newTeacher.email || ""}
              onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
              className="col-span-3"
              placeholder="请输入邮箱地址"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="phone" className="text-right text-sm font-medium">
              电话
            </label>
            <Input
              id="phone"
              value={newTeacher.phone || ""}
              onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
              className="col-span-3"
              placeholder="请输入电话号码"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="office" className="text-right text-sm font-medium">
              办公室
            </label>
            <Input
              id="office"
              value={newTeacher.office || ""}
              onChange={(e) => setNewTeacher({ ...newTeacher, office: e.target.value })}
              className="col-span-3"
              placeholder="请输入办公室位置"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="hireDate" className="text-right text-sm font-medium">
              入职日期
            </label>
            <Input
              id="hireDate"
              type="date"
              value={newTeacher.hireDate || ""}
              onChange={(e) => setNewTeacher({ ...newTeacher, hireDate: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status" className="text-right text-sm font-medium">
              状态
            </label>
            <Select
              value={newTeacher.status || ""}
              onValueChange={(value) =>
                setNewTeacher({
                  ...newTeacher,
                  status: value as "active" | "onLeave" | "resigned",
                })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="active" value="active">在职</SelectItem>
                <SelectItem key="onLeave" value="onLeave">休假</SelectItem>
                <SelectItem key="resigned" value="resigned">离职</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            取消
          </Button>
          <Button 
            onClick={onAddTeacher}
            disabled={isSubmitting}
            className="min-w-[80px]"
          >
            {isSubmitting ? '添加中...' : '添加'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherAddDialog;