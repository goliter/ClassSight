import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

interface TeacherEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingTeacher: Partial<Teacher>;  // 修改为Partial<Teacher>
  setEditingTeacher: React.Dispatch<React.SetStateAction<Partial<Teacher>>>;  // 修改为Partial<Teacher>
  departments: Department[];
  onEditTeacher: () => void;
  isSubmitting?: boolean;
}

const TeacherEditDialog: React.FC<TeacherEditDialogProps> = ({
  open,
  onOpenChange,
  editingTeacher,
  setEditingTeacher,
  departments,
  onEditTeacher,
  isSubmitting = false
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>编辑教师</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-name" className="text-right text-sm font-medium">
              姓名
            </label>
            <Input
              id="edit-name"
              value={editingTeacher.name || ""}
              onChange={(e) =>
                setEditingTeacher({
                  ...editingTeacher,
                  name: e.target.value,
                })
              }
              className="col-span-3"
              placeholder="请输入教师姓名"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-teacherId" className="text-right text-sm font-medium">
              工号
            </label>
            <Input
              id="edit-teacherId"
              value={editingTeacher.teacherId || ""}
              onChange={(e) =>
                setEditingTeacher({
                  ...editingTeacher,
                  teacherId: e.target.value,
                })
              }
              className="col-span-3"
              placeholder="请输入教师工号"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-department" className="text-right text-sm font-medium">
              所属学院
            </label>
            <Select
              value={editingTeacher.departmentId || ""}
              onValueChange={(value) => {
                const selectedDepartment = departments.find(dept => dept.id === value);
                setEditingTeacher({
                  ...editingTeacher,
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
            <label htmlFor="edit-rank" className="text-right text-sm font-medium">
              职称
            </label>
            <Select
              value={editingTeacher.rank || ""}
              onValueChange={(value) =>
                setEditingTeacher({ ...editingTeacher, rank: value })
              }
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
            <label htmlFor="edit-email" className="text-right text-sm font-medium">
              邮箱
            </label>
            <Input
              id="edit-email"
              value={editingTeacher.email || ""}
              onChange={(e) =>
                setEditingTeacher({
                  ...editingTeacher,
                  email: e.target.value,
                })
              }
              className="col-span-3"
              placeholder="请输入邮箱地址"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-phone" className="text-right text-sm font-medium">
              电话
            </label>
            <Input
              id="edit-phone"
              value={editingTeacher.phone || ""}
              onChange={(e) =>
                setEditingTeacher({
                  ...editingTeacher,
                  phone: e.target.value,
                })
              }
              className="col-span-3"
              placeholder="请输入电话号码"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-office" className="text-right text-sm font-medium">
              办公室
            </label>
            <Input
              id="edit-office"
              value={editingTeacher.office || ""}
              onChange={(e) =>
                setEditingTeacher({
                  ...editingTeacher,
                  office: e.target.value,
                })
              }
              className="col-span-3"
              placeholder="请输入办公室位置"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-hireDate" className="text-right text-sm font-medium">
              入职日期
            </label>
            <Input
              id="edit-hireDate"
              type="date"
              value={editingTeacher.hireDate || ""}
              onChange={(e) =>
                setEditingTeacher({
                  ...editingTeacher,
                  hireDate: e.target.value,
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-status" className="text-right text-sm font-medium">
              状态
            </label>
            <Select
              value={editingTeacher.status || ""}
              onValueChange={(value) =>
                setEditingTeacher({
                  ...editingTeacher,
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
          <Button onClick={onEditTeacher} disabled={isSubmitting}>
            {isSubmitting ? '保存中...' : '保存'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherEditDialog;