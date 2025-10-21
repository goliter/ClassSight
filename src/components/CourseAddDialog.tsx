import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

// 定义接口
interface Course {
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

interface Teacher {
  teacherId: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
}

interface CourseAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newCourse: Partial<Course>;
  setNewCourse: React.Dispatch<React.SetStateAction<Partial<Course>>>;
  teachers: Teacher[];
  departments: Department[];
  onAddCourse: () => void;
}

// 工具函数：创建安全的唯一ID
const createSafeId = (prefix: string): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const CourseAddDialog: React.FC<CourseAddDialogProps> = ({
  open,
  onOpenChange,
  newCourse,
  setNewCourse,
  teachers,
  departments,
  onAddCourse,
}) => {
  // 处理教师选择变化
  const handleTeacherChange = (value: string) => {
    const selectedTeacher = teachers.find(t => String(t.teacherId) === value);  
    setNewCourse(prev => ({
      ...prev,
      teacherId: value,
      teacherName: selectedTeacher?.name
    }));
  };

  // 处理部门选择变化
  const handleDepartmentChange = (value: string) => {
    const selectedDept = departments.find(d => String(d.id) === value);
    setNewCourse(prev => ({
      ...prev,
      departmentId: value,
      departmentName: selectedDept?.name
    }));
  };

  // 处理学分变化
  const handleCreditsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    // 验证学分范围
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setNewCourse(prev => ({ ...prev, credits: value }));
    }
  };

  // 重置表单
  const handleReset = () => {
    setNewCourse({
      name: '',
      code: '',
      teacherId: '',
      departmentId: '',
      credits: 3,
      description: '',
      status: 'active'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>添加课程</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* 课程名称 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="courseName" className="text-right font-medium">
              课程名称
            </label>
            <Input
              id="courseName"
              placeholder="请输入课程名称"
              value={newCourse.name || ''}
              onChange={(e) => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
              className="col-span-3"
              required
            />
          </div>
          
          {/* 课程代码 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="courseCode" className="text-right font-medium">
              课程代码
            </label>
            <Input
              id="courseCode"
              placeholder="请输入课程代码"
              value={newCourse.code || ''}
              onChange={(e) => setNewCourse(prev => ({ ...prev, code: e.target.value }))}
              className="col-span-3"
              required
            />
          </div>
          
          {/* 授课教师 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="courseTeacher" className="text-right font-medium">
              授课教师
            </label>
            <Select
              value={String(newCourse.teacherId || '')}
              onValueChange={(value) => {
                const selectedTeacher = teachers.find(t => String(t.teacherId) === value);
                if (selectedTeacher) {
                  setNewCourse(prev => ({
                    ...prev,
                    teacherId: value,
                    teacherName: selectedTeacher.name
                  }));
                }
              }}
            >
              <SelectTrigger id="courseTeacher" className="col-span-3">
                <SelectValue placeholder="选择教师" />
              </SelectTrigger>
              <SelectContent>
                {teachers.length > 0 ? (
                  teachers.map((teacher) => {
                    const teacherIdStr = String(teacher.teacherId);
                    return (
                      <SelectItem 
                        key={teacherIdStr} 
                        value={teacherIdStr}
                      >
                        {teacher.name}
                      </SelectItem>
                    );
                  })
                ) : (
                  <div className="flex justify-center py-2 text-gray-500">
                    暂无教师数据
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
          
          {/* 所属学院 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="courseDepartment" className="text-right font-medium">
              所属学院
            </label>
            <Select
              value={String(newCourse.departmentId || '')}
              onValueChange={(value) => {
                const selectedDept = departments.find(d => String(d.id) === value);
                if (selectedDept) {
                  setNewCourse(prev => ({
                    ...prev,
                    departmentId: value,
                    departmentName: selectedDept.name
                  }));
                }
              }}
            >
              <SelectTrigger id="courseDepartment" className="col-span-3">
                <SelectValue placeholder="选择学院" />
              </SelectTrigger>
              <SelectContent>
                {departments.length > 0 ? (
                  departments.map((department) => {
                    const deptIdStr = String(department.id);
                    return (
                      <SelectItem 
                        key={deptIdStr} 
                        value={deptIdStr}
                      >
                        {department.name}
                      </SelectItem>
                    );
                  })
                ) : (
                  <div className="flex justify-center py-2 text-gray-500">
                    暂无学院数据
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
          
          {/* 学分 */}
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
              onChange={handleCreditsChange}
              className="col-span-3"
              required
            />
          </div>
          
          {/* 课程状态 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="courseStatus" className="text-right font-medium">
              状态
            </label>
            <Select
              value={newCourse.status || 'active'}
              onValueChange={(value) => setNewCourse(prev => ({
                ...prev,
                status: value as 'active' | 'inactive' | 'pending'
              }))}
            >
              <SelectTrigger id="courseStatus" className="col-span-3">
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">进行中</SelectItem>
                <SelectItem value="pending">待开始</SelectItem>
                <SelectItem value="inactive">已结束</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* 课程描述 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="courseDescription"
              className="text-right font-medium"
            >
              课程描述
            </label>
            <Textarea
              id="courseDescription"
              placeholder="请输入课程描述"
              value={newCourse.description || ''}
              onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
              className="col-span-3 min-h-[100px]"
            />
          </div>
        </div>
        
        {/* 底部按钮区域 */}
        <DialogFooter className="flex space-x-3">
          <Button variant="ghost" onClick={() => setNewCourse({})}>
            重置
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button 
            onClick={onAddCourse}
            disabled={!newCourse.name || !newCourse.code || !newCourse.teacherId || !newCourse.departmentId}
          >
            添加课程
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseAddDialog;