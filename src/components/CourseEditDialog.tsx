import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

// 定义Course接口
interface Course {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  teacherName?: string;
  departmentId: string;
  departmentName?: string;
  credits: number;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  studentCount?: number;
}

// 定义Teacher接口
interface Teacher {
  id: string;
  name: string;
}

// 定义Department接口
interface Department {
  id: string;
  name: string;
}

// 定义组件Props
interface CourseEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCourse: Partial<Course>;
  setEditingCourse: React.Dispatch<React.SetStateAction<Partial<Course>>>;
  teachers: Teacher[];
  departments: Department[];
  onEditCourse: () => void;
  selectedCourse: Course | null;
}

const CourseEditDialog: React.FC<CourseEditDialogProps> = ({
  open,
  onOpenChange,
  editingCourse,
  setEditingCourse,
  teachers,
  departments,
  onEditCourse,
  selectedCourse,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>编辑课程</DialogTitle>
        </DialogHeader>
        {selectedCourse && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editCourseName"
                className="text-right font-medium"
              >
                课程名称
              </label>
              <Input
                id="editCourseName"
                placeholder="请输入课程名称"
                value={editingCourse.name || ""}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editCourseCode"
                className="text-right font-medium"
              >
                课程代码
              </label>
              <Input
                id="editCourseCode"
                placeholder="请输入课程代码"
                value={editingCourse.code || ""}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, code: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editCourseTeacher"
                className="text-right font-medium"
              >
                授课教师
              </label>
              <Select
                value={editingCourse.teacherId || ""}
                onValueChange={(value) =>
                  setEditingCourse({ ...editingCourse, teacherId: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="选择教师" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editCourseDepartment"
                className="text-right font-medium"
              >
                所属学院
              </label>
              <Select
                value={editingCourse.departmentId || ""}
                onValueChange={(value) =>
                  setEditingCourse({ ...editingCourse, departmentId: value })
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
                htmlFor="editCourseCredits"
                className="text-right font-medium"
              >
                学分
              </label>
              <Input
                id="editCourseCredits"
                type="number"
                min="1"
                max="10"
                value={editingCourse.credits || 3}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    credits: parseInt(e.target.value),
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editCourseStatus"
                className="text-right font-medium"
              >
                状态
              </label>
              <Select
                value={(editingCourse.status as string) || "active"}
                onValueChange={(value) =>
                  setEditingCourse({
                    ...editingCourse,
                    status: value as "active" | "inactive" | "pending",
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">进行中</SelectItem>
                  <SelectItem value="pending">待开始</SelectItem>
                  <SelectItem value="inactive">已结束</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editCourseDescription"
                className="text-right font-medium"
              >
                课程描述
              </label>
              <Input
                id="editCourseDescription"
                placeholder="请输入课程描述"
                value={editingCourse.description || ""}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    description: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={onEditCourse}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEditDialog;