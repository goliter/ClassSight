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
}

interface TeacherAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newTeacher: Partial<Teacher>;
  setNewTeacher: React.Dispatch<React.SetStateAction<Partial<Teacher>>>;
  departments: Department[];
  onAddTeacher: () => void;
}

const TeacherAddDialog: React.FC<TeacherAddDialogProps> = ({
  open,
  onOpenChange,
  newTeacher,
  setNewTeacher,
  departments,
  onAddTeacher
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
              姓名
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
              工号
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
            <label htmlFor="department" className="text-right text-sm font-medium">
              所属学院
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
              职称
            </label>
            <Select
              value={newTeacher.rank || ""}
              onValueChange={(value) => setNewTeacher({ ...newTeacher, rank: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="选择职称" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="教授">教授</SelectItem>
                <SelectItem value="副教授">副教授</SelectItem>
                <SelectItem value="讲师">讲师</SelectItem>
                <SelectItem value="助教">助教</SelectItem>
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
                <SelectItem value="active">在职</SelectItem>
                <SelectItem value="onLeave">休假</SelectItem>
                <SelectItem value="resigned">离职</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={onAddTeacher}>添加</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherAddDialog;