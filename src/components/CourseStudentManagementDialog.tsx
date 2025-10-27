import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter as AlertFooter, AlertDialogHeader, AlertDialogTitle as AlertTitle } from './ui/alert-dialog';
import { toast } from 'sonner';
import { Search, Plus, Trash2, Users } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  studentId: string;
  departmentName: string;
  majorName?: string;
  grade?: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
}

interface CourseStudentManagementDialogProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCourse: Course | null;
}

const CourseStudentManagementDialog: React.FC<CourseStudentManagementDialogProps> = ({
  open,
  onOpenChange,
  selectedCourse
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedStudentToAdd, setSelectedStudentToAdd] = useState<Student | null>(null);

  // 获取课程学生列表
  const fetchCourseStudents = async () => {
    if (!selectedCourse) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/course/students/${selectedCourse.id}`);
      const data = await response.json();
      
      if (response.ok) {
        setStudents(data.data || []);
      } else {
        toast.error(data.error || '获取学生列表失败');
      }
    } catch (error) {
      console.error('获取学生列表错误:', error);
      toast.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 当选择的课程改变时，重新获取学生列表
  useEffect(() => {
    if (open && selectedCourse) {
      fetchCourseStudents();
    }
  }, [open, selectedCourse]);

  // 获取所有学生列表
  const fetchAllStudents = async () => {
    if (!selectedCourse) return;
    
    try {
      setLoading(true);

      const response = await fetch('/api/student');
      const data = await response.json();
      
      if (response.ok) {
        // 过滤掉已经在课程中的学生
        const courseStudentIds = students.map(s => s.studentId);
        console.log("courseStudentIds", courseStudentIds);
        const filteredStudents = (data|| []).filter((student: Student) => 
          !courseStudentIds.includes(student.studentId)
        );
        console.log(filteredStudents);
        setAllStudents(filteredStudents);
      } else {
        toast.error(data.error || '获取学生列表失败');
      }
    } catch (error) {
      console.error('获取学生列表错误:', error);
      toast.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 添加学生到课程
  const handleAddStudent = async () => {
    if (!selectedCourse || !selectedStudentToAdd) {
      toast.error('请选择要添加的学生');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/course/students/${selectedCourse.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId: selectedStudentToAdd.studentId }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsAddDialogOpen(false);
        setSelectedStudentToAdd(null);
        setStudentSearchTerm('');
        toast.success(`学生 ${selectedStudentToAdd.name} 添加成功`);
        await fetchCourseStudents();
      } else {
        toast.error(data.error || '添加学生失败');
      }
    } catch (error) {
      console.error('添加学生错误:', error);
      toast.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 当添加学生对话框打开时，获取所有学生列表
  useEffect(() => {
    if (isAddDialogOpen && selectedCourse) {
      fetchAllStudents();
    }
  }, [isAddDialogOpen, selectedCourse, students]);

  // 从课程中移除学生
  const handleRemoveStudent = async () => {
    if (!selectedCourse || !selectedStudentId) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/course/students/${selectedCourse.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId: selectedStudentId }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsDeleteDialogOpen(false);
        setSelectedStudentId(null);
        toast.success('学生已移除');
        await fetchCourseStudents();
      } else {
        toast.error(data.error || '移除学生失败');
      }
    } catch (error) {
      console.error('移除学生错误:', error);
      toast.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 过滤课程中的学生列表
  const filteredStudents = students.filter(student => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      (student.name && student.name.toLowerCase().includes(lowerSearchTerm)) ||
      (student.studentId &&
        student.studentId.toLowerCase().includes(lowerSearchTerm)) ||
      (student.departmentName &&
        student.departmentName.toLowerCase().includes(lowerSearchTerm))
    );
  });

  // 过滤所有学生列表（用于添加学生对话框）
  const filteredAllStudents = allStudents.filter(student => {
    const lowerSearchTerm = studentSearchTerm.toLowerCase();
    return (
      (student.name && student.name.toLowerCase().includes(lowerSearchTerm)) ||
      (student.studentId && student.studentId.toLowerCase().includes(lowerSearchTerm))
    );
  });

  // 打开删除确认对话框
  const openDeleteDialog = (studentId: string) => {
    setSelectedStudentId(studentId);
    setIsDeleteDialogOpen(true);
  };

  if (!selectedCourse) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Users className="h-5 w-5" />
            {selectedCourse.name} - 学生管理
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 搜索和添加按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索学生..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              <Plus className="h-4 w-4 mr-2" />
              添加学生
            </Button>
          </div>

          {/* 学生列表 */}
          <Card>
            <CardContent className="p-4">
              {loading ? (
                <div className="text-center py-8">加载中...</div>
              ) : filteredStudents.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {filteredStudents.map((student) => (
                    <div 
                      key={student.id}
                      className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{student.name}</div>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>学号: {student.studentId}</span>
                          <Badge variant="secondary">{student.departmentName}</Badge>
                          {student.majorName && <Badge variant="outline">{student.majorName}</Badge>}
                          {student.grade && <Badge variant="outline">{student.grade}</Badge>}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(student.studentId)}
                        className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  {searchTerm ? '没有找到符合条件的学生' : '该课程暂无学生'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            关闭
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* 添加学生对话框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>添加学生到 {selectedCourse.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索学生（姓名或学号）..."
                value={studentSearchTerm}
                onChange={(e) => setStudentSearchTerm(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
            
            {/* 学生列表 */}
            <div className="max-h-[400px] overflow-y-auto border rounded-lg">
              {loading ? (
                <div className="text-center py-8">加载中...</div>
              ) : filteredAllStudents.length > 0 ? (
                <div className="grid grid-cols-1 divide-y">
                  {filteredAllStudents.map((student) => (
                    <div
                      key={student.studentId}
                      className={`p-3 flex items-center justify-between cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedStudentToAdd?.studentId === student.studentId ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                      onClick={() => setSelectedStudentToAdd(student)}
                    >
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <span>{student.name}</span>
                          <span className="text-sm text-gray-500">{student.studentId}</span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {student.departmentName}{student.majorName ? ` - ${student.majorName}` : ''}
                        </div>
                      </div>
                      {selectedStudentToAdd?.studentId === student.studentId && (
                        <Badge className="bg-blue-600">已选择</Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  {studentSearchTerm ? '没有找到符合条件的学生' : '没有可添加的学生'}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddDialogOpen(false);
                setSelectedStudentToAdd(null);
                setStudentSearchTerm('');
              }}
              disabled={loading}
            >
              取消
            </Button>
            <Button 
              onClick={handleAddStudent}
              disabled={loading || !selectedStudentToAdd}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? '添加中...' : '确认添加'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除学生确认对话框 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertTitle>确认移除</AlertTitle>
            <AlertDialogDescription>
              您确定要将学生"{selectedStudentId ? students.find(s => s.id === selectedStudentId)?.name : ''}"从课程中移除吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertFooter>
            <AlertDialogCancel onClick={() => {
              setIsDeleteDialogOpen(false);
              setSelectedStudentId(null);
            }}>取消</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleRemoveStudent}
              disabled={loading}
            >
              {loading ? '移除中...' : '确认移除'}
            </AlertDialogAction>
          </AlertFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};

export default CourseStudentManagementDialog;