import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

// 定义Student接口
interface Student {
  id?: string;
  name: string;
  studentId: string;
  departmentId: string;
  departmentName?: string;
  major: string;
  grade: string;
  class: string;
  email: string;
  phone: string;
  enrollmentDate: string;
  status: 'active' | 'suspended' | 'graduated';
  password?: string;
}

// 定义Department接口
interface Department {
  id: string;
  name: string;
}

// 定义组件Props
interface StudentAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newStudent: Partial<Student>;
  setNewStudent: React.Dispatch<React.SetStateAction<Partial<Student>>>;
  departments: Department[];
  onAddStudent: () => void;
}

const StudentAddDialog: React.FC<StudentAddDialogProps> = ({
  open,
  onOpenChange,
  newStudent,
  setNewStudent,
  departments,
  onAddStudent,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>添加学生</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="studentName" className="text-right font-medium">
              姓名
            </label>
            <Input
              id="studentName"
              placeholder="请输入学生姓名"
              value={newStudent.name || ""}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="studentId" className="text-right font-medium">
              学号
            </label>
            <Input
              id="studentId"
              placeholder="请输入学号"
              value={newStudent.studentId || ""}
              onChange={(e) =>
                setNewStudent({ ...newStudent, studentId: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="studentDepartment"
              className="text-right font-medium"
            >
              所属学院
            </label>
            <Select
              value={newStudent.departmentId || ""}
              onValueChange={(value) =>
                setNewStudent({ ...newStudent, departmentId: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="选择学院" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="studentMajor" className="text-right font-medium">
              专业
            </label>
            <Input
              id="studentMajor"
              placeholder="请输入专业"
              value={newStudent.major || ""}
              onChange={(e) =>
                setNewStudent({ ...newStudent, major: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="studentGrade" className="text-right font-medium">
              年级
            </label>
            <Select
              value={newStudent.grade || "2023"}
              onValueChange={(value) =>
                setNewStudent({ ...newStudent, grade: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="选择年级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2020">2020级</SelectItem>
                <SelectItem value="2021">2021级</SelectItem>
                <SelectItem value="2022">2022级</SelectItem>
                <SelectItem value="2023">2023级</SelectItem>
                <SelectItem value="2024">2024级</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="studentClass" className="text-right font-medium">
              班级
            </label>
            <Input
              id="studentClass"
              placeholder="请输入班级"
              value={newStudent.class || ""}
              onChange={(e) =>
                setNewStudent({ ...newStudent, class: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="studentEmail" className="text-right font-medium">
              邮箱
            </label>
            <Input
              id="studentEmail"
              type="email"
              placeholder="请输入邮箱"
              value={newStudent.email || ""}
              onChange={(e) =>
                setNewStudent({ ...newStudent, email: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="studentPhone" className="text-right font-medium">
              电话
            </label>
            <Input
              id="studentPhone"
              placeholder="请输入电话"
              value={newStudent.phone || ""}
              onChange={(e) =>
                setNewStudent({ ...newStudent, phone: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="studentPassword" className="text-right font-medium">
              密码
            </label>
            <Input
              id="studentPassword"
              type="password"
              placeholder="请输入密码"
              value={newStudent.password || ""}
              onChange={(e) =>
                setNewStudent({ ...newStudent, password: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="studentEnrollmentDate"
              className="text-right font-medium"
            >
              入学日期
            </label>
            <Input
              id="studentEnrollmentDate"
              type="date"
              value={
                newStudent.enrollmentDate ||
                new Date().toISOString().split("T")[0]
              }
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  enrollmentDate: e.target.value,
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="studentStatus" className="text-right font-medium">
              状态
            </label>
            <Select
              value={(newStudent.status as string) || "active"}
              onValueChange={(value) =>
                setNewStudent({
                  ...newStudent,
                  status: value as "active" | "suspended" | "graduated",
                })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">在读</SelectItem>
                <SelectItem value="suspended">休学</SelectItem>
                <SelectItem value="graduated">毕业</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={onAddStudent}>添加</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentAddDialog;