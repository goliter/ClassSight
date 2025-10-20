import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

// 定义Student接口
interface Student {
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
}

// 定义Department接口
interface Department {
  id: string;
  name: string;
}

// 定义组件Props
interface StudentEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingStudent: Partial<Student>;
  setEditingStudent: React.Dispatch<React.SetStateAction<Partial<Student>>>;
  departments: Department[];
  onEditStudent: () => void;
  selectedStudent: Student | null;
}

const StudentEditDialog: React.FC<StudentEditDialogProps> = ({
  open,
  onOpenChange,
  editingStudent,
  setEditingStudent,
  departments,
  onEditStudent,
  selectedStudent,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>编辑学生</DialogTitle>
        </DialogHeader>
        {selectedStudent && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editStudentName"
                className="text-right font-medium"
              >
                姓名
              </label>
              <Input
                id="editStudentName"
                placeholder="请输入学生姓名"
                value={editingStudent.name || ""}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    name: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editStudentId"
                className="text-right font-medium"
              >
                学号
              </label>
              <Input
                id="editStudentId"
                placeholder="请输入学号"
                value={editingStudent.studentId || ""}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    studentId: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editStudentDepartment"
                className="text-right font-medium"
              >
                所属学院
              </label>
              <Select
                value={editingStudent.departmentId || ""}
                onValueChange={(value) =>
                  setEditingStudent({
                    ...editingStudent,
                    departmentId: value,
                  })
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
              <label
                htmlFor="editStudentMajor"
                className="text-right font-medium"
              >
                专业
              </label>
              <Input
                id="editStudentMajor"
                placeholder="请输入专业"
                value={editingStudent.major || ""}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    major: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editStudentGrade"
                className="text-right font-medium"
              >
                年级
              </label>
              <Select
                value={editingStudent.grade || "2023"}
                onValueChange={(value) =>
                  setEditingStudent({ ...editingStudent, grade: value })
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
              <label
                htmlFor="editStudentClass"
                className="text-right font-medium"
              >
                班级
              </label>
              <Input
                id="editStudentClass"
                placeholder="请输入班级"
                value={editingStudent.class || ""}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    class: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editStudentEmail"
                className="text-right font-medium"
              >
                邮箱
              </label>
              <Input
                id="editStudentEmail"
                type="email"
                placeholder="请输入邮箱"
                value={editingStudent.email || ""}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    email: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editStudentPhone"
                className="text-right font-medium"
              >
                电话
              </label>
              <Input
                id="editStudentPhone"
                placeholder="请输入电话"
                value={editingStudent.phone || ""}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    phone: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editStudentEnrollmentDate"
                className="text-right font-medium"
              >
                入学日期
              </label>
              <Input
                id="editStudentEnrollmentDate"
                type="date"
                value={
                  editingStudent.enrollmentDate ||
                  new Date().toISOString().split("T")[0]
                }
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    enrollmentDate: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editStudentStatus"
                className="text-right font-medium"
              >
                状态
              </label>
              <Select
                value={(editingStudent.status as string) || "active"}
                onValueChange={(value) =>
                  setEditingStudent({
                    ...editingStudent,
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
        )}
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={onEditStudent}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentEditDialog;