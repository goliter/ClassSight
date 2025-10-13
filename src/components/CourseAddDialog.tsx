import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

// 定义Course接口
interface Course {
  id?: string;
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
interface CourseAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newCourse: Partial<Course>;
  setNewCourse: React.Dispatch<React.SetStateAction<Partial<Course>>>;
  teachers: Teacher[];
  departments: Department[];
  onAddCourse: () => void;
}

const CourseAddDialog: React.FC<CourseAddDialogProps> = ({
  open,
  onOpenChange,
  newCourse,
  setNewCourse,
  teachers,
  departments,
  onAddCourse,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>添加课程</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="courseName" className="text-right font-medium">
              课程名称
            </label>
            <Input
              id="courseName"
              placeholder="请输入课程名称"
              value={newCourse.name || ""}
              onChange={(e) =>
                setNewCourse({ ...newCourse, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="courseCode" className="text-right font-medium">
              课程代码
            </label>
            <Input
              id="courseCode"
              placeholder="请输入课程代码"
              value={newCourse.code || ""}
              onChange={(e) =>
                setNewCourse({ ...newCourse, code: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="courseTeacher" className="text-right font-medium">
              授课教师
            </label>
            <Select
              value={newCourse.teacherId || ""}
              onValueChange={(value) =>
                setNewCourse({ ...newCourse, teacherId: value })
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
              htmlFor="courseDepartment"
              className="text-right font-medium"
            >
              所属学院
            </label>
            <Select
              value={newCourse.departmentId || ""}
              onValueChange={(value) =>
                setNewCourse({ ...newCourse, departmentId: value })
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
            <label htmlFor="courseCredits" className="text-right font-medium">
              学分
            </label>
            <Input
              id="courseCredits"
              type="number"
              min="1"
              max="10"
              value={newCourse.credits || 3}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  credits: parseInt(e.target.value),
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="courseStatus" className="text-right font-medium">
              状态
            </label>
            <Select
              value={(newCourse.status as string) || "active"}
              onValueChange={(value) =>
                setNewCourse({
                  ...newCourse,
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
              htmlFor="courseDescription"
              className="text-right font-medium"
            >
              课程描述
            </label>
            <Input
              id="courseDescription"
              placeholder="请输入课程描述"
              value={newCourse.description || ""}
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={onAddCourse}>添加</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseAddDialog;