import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import ScheduleEditor from './ScheduleEditor';
import { ScheduleItem } from './ScheduleEditor';

// 定义接口
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
  schedule?: ScheduleItem[];
}

interface Teacher {
  teacherId: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
}

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

// 工具函数：创建安全的唯一ID
const createSafeId = (prefix: string): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// 工具函数：获取选中的教师/部门名称
const getSelectedItemName = (id: string | undefined, items: Array<{id: string, name: string}>): string => {
  if (!id) return '';
  const item = items.find(item => String(item.id) === String(id));
  return item?.name || '';
};

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
  // 处理教师选择变化
  const handleTeacherChange = (value: string) => {
    const selectedTeacher = teachers.find(t => String(t.teacherId) === value);
    setEditingCourse(prev => ({
      ...prev,
      teacherId: value,
      teacherName: selectedTeacher?.name
    }));
  };

  // 处理部门选择变化
  const handleDepartmentChange = (value: string) => {
    const selectedDept = departments.find(d => String(d.id) === value);
    setEditingCourse(prev => ({
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
      setEditingCourse(prev => ({ ...prev, credits: value }));
    }
  };

  // 处理表单重置（可选功能）
  const handleReset = () => {
    if (selectedCourse) {
      setEditingCourse(selectedCourse);
    }
  };

  // 处理课程安排变化
  const handleScheduleChange = (schedule: ScheduleItem[]) => {
    setEditingCourse(prev => ({ ...prev, schedule }));
  };

  // 确保有选中的课程
  if (!selectedCourse) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑课程</DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center text-gray-500">
            请先选择要编辑的课程
          </div>
          <DialogFooter>
            <Button variant="default" onClick={() => onOpenChange(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>编辑课程</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* 课程名称 */}
          <div className="space-y-2">
            <label htmlFor="editCourseName" className="block font-medium">
              课程名称 *
            </label>
            <Input
              id="editCourseName"
              placeholder="请输入课程名称"
              value={editingCourse.name || ''}
              onChange={(e) => setEditingCourse(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          {/* 课程代码 */}
          <div className="space-y-2">
            <label htmlFor="editCourseCode" className="block font-medium">
              课程代码 *
            </label>
            <Input
              id="editCourseCode"
              placeholder="请输入课程代码"
              value={editingCourse.code || ''}
              onChange={(e) => setEditingCourse(prev => ({ ...prev, code: e.target.value }))}
              required
            />
          </div>
          
          {/* 授课教师 */}
          <div className="space-y-2">
            <label htmlFor="editCourseTeacher" className="block font-medium">
              授课教师 *
            </label>
            <Select
              value={String(editingCourse.teacherId || '')}
              onValueChange={(value) => {
                const selectedTeacher = teachers.find(t => String(t.teacherId) === value);
                if (selectedTeacher) {
                  setEditingCourse(prev => ({
                    ...prev,
                    teacherId: value,
                    teacherName: selectedTeacher.name
                  }));
                }
              }}
            >
              <SelectTrigger id="editCourseTeacher">
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
          <div className="space-y-2">
            <label htmlFor="editCourseDepartment" className="block font-medium">
              所属学院 *
            </label>
            <Select
              value={String(editingCourse.departmentId || '')}
              onValueChange={(value) => {
                const selectedDept = departments.find(d => String(d.id) === value);
                if (selectedDept) {
                  setEditingCourse(prev => ({
                    ...prev,
                    departmentId: value,
                    departmentName: selectedDept.name
                  }));
                }
              }}
            >
              <SelectTrigger id="editCourseDepartment">
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
          <div className="space-y-2">
            <label htmlFor="editCourseCredits" className="block font-medium">
              学分 *
            </label>
            <Input
              id="editCourseCredits"
              type="number"
              min="1"
              max="10"
              value={editingCourse.credits || 3}
              onChange={handleCreditsChange}
              required
            />
          </div>
          
          {/* 课程状态 */}
          <div className="space-y-2">
            <label htmlFor="editCourseStatus" className="block font-medium">
              状态
            </label>
            <Select
              value={editingCourse.status || "active"}
              onValueChange={(value) => setEditingCourse(prev => ({
                ...prev,
                status: value as "active" | "inactive" | "pending"
              }))}
            >
              <SelectTrigger id="editCourseStatus">
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
          <div className="space-y-2">
            <label
              htmlFor="editCourseDescription"
              className="block font-medium"
            >
              课程描述
            </label>
            <Textarea
              id="editCourseDescription"
              placeholder="请输入课程描述"
              value={editingCourse.description || ''}
              onChange={(e) => setEditingCourse(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>
          
          {/* 课程安排 */}
          <div className="space-y-4">
            <ScheduleEditor 
              initialSchedule={editingCourse.schedule || []}
              onScheduleChange={handleScheduleChange}
            />
          </div>
        </div>
        {/* 对话框底部按钮 */}
        <DialogFooter>
          <div className="flex space-x-2 w-full justify-end">
            <Button variant="ghost" onClick={() => {
              if (selectedCourse) {
                setEditingCourse({...selectedCourse});
              }
            }}>
              重置
            </Button>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button onClick={onEditCourse}>
              保存更改
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEditDialog;