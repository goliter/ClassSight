"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import StudentNavigation from '@/components/StudentNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from "sonner";
import { Badge } from '@/components/ui/badge';

// 课程接口定义
interface Course {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  teacherName: string;
  departmentId: string;
  departmentName: string;
  credits: number;
  studentCount: number;
  status: 'active' | 'inactive' | 'pending';
  description: string;
}

// 教师接口定义
interface Teacher {
  id: string;
  name: string;
}

// 部门接口定义
interface Department {
  id: string;
  name: string;
}

const CourseManagementPage: React.FC = () => {
  // 模拟课程数据
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      name: 'Web前端开发',
      code: 'CS1001',
      teacherId: 'T10001',
      teacherName: '张教授',
      departmentId: '1',
      departmentName: '信息科学与技术学院',
      credits: 3,
      studentCount: 35,
      status: 'active',
      description: '学习Web前端开发技术，包括HTML、CSS、JavaScript等'
    },
    {
      id: '2',
      name: '数据结构与算法',
      code: 'CS1002',
      teacherId: 'T10002',
      teacherName: '李教授',
      departmentId: '1',
      departmentName: '信息科学与技术学院',
      credits: 4,
      studentCount: 42,
      status: 'active',
      description: '学习数据结构的基本概念和常用算法'
    },
    {
      id: '3',
      name: '人工智能导论',
      code: 'AI1001',
      teacherId: 'T10003',
      teacherName: '王教授',
      departmentId: '2',
      departmentName: '人工智能学院',
      credits: 3,
      studentCount: 50,
      status: 'pending',
      description: '介绍人工智能的基本概念和应用领域'
    },
    {
      id: '4',
      name: '高等数学',
      code: 'MATH1001',
      teacherId: 'T10004',
      teacherName: '赵教授',
      departmentId: '3',
      departmentName: '数学与统计学院',
      credits: 5,
      studentCount: 120,
      status: 'active',
      description: '高等数学的基本理论和应用'
    },
  ]);

  // 模拟教师数据
  const [teachers] = useState<Teacher[]>([
    { id: 'T10001', name: '张教授' },
    { id: 'T10002', name: '李教授' },
    { id: 'T10003', name: '王教授' },
    { id: 'T10004', name: '赵教授' },
  ]);

  // 模拟部门数据
  const [departments] = useState<Department[]>([
    { id: '1', name: '信息科学与技术学院' },
    { id: '2', name: '人工智能学院' },
    { id: '3', name: '数学与统计学院' },
  ]);

  // 状态管理
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    name: '',
    code: '',
    teacherId: '',
    departmentId: '',
    credits: 3,
    status: 'active',
    description: ''
  });
  const [editingCourse, setEditingCourse] = useState<Partial<Course>>({});
  const itemsPerPage = 10;

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 过滤数据
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 分页
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 处理添加课程
  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.code || !newCourse.teacherId || !newCourse.departmentId) {
      toast.error('请填写课程名称、代码、教师和部门');
      return;
    }

    const teacher = teachers.find(t => t.id === newCourse.teacherId);
    const department = departments.find(d => d.id === newCourse.departmentId);

    if (!teacher || !department) {
      toast.error('请选择有效的教师和部门');
      return;
    }

    const course: Course = {
      id: (courses.length + 1).toString(),
      name: newCourse.name || '',
      code: newCourse.code || '',
      teacherId: newCourse.teacherId || '',
      teacherName: teacher.name,
      departmentId: newCourse.departmentId || '',
      departmentName: department.name,
      credits: newCourse.credits || 3,
      studentCount: 0,
      status: newCourse.status as 'active' | 'inactive' | 'pending' || 'pending',
      description: newCourse.description || ''
    };

    setCourses([...courses, course]);
    setIsAddDialogOpen(false);
    setNewCourse({
      name: '',
      code: '',
      teacherId: '',
      departmentId: '',
      credits: 3,
      status: 'active',
      description: ''
    });
    toast.success('课程创建成功');
  };

  // 处理编辑课程
  const handleEditCourse = () => {
    if (!selectedCourse || !editingCourse.name || !editingCourse.code || !editingCourse.teacherId || !editingCourse.departmentId) {
      toast.error('请填写课程名称、代码、教师和部门');
      return;
    }

    const teacher = teachers.find(t => t.id === editingCourse.teacherId);
    const department = departments.find(d => d.id === editingCourse.departmentId);

    if (!teacher || !department) {
      toast.error('请选择有效的教师和部门');
      return;
    }

    setCourses(courses.map(course => 
      course.id === selectedCourse.id
        ? {
            ...course,
            name: editingCourse.name || course.name,
            code: editingCourse.code || course.code,
            teacherId: editingCourse.teacherId || course.teacherId,
            teacherName: teacher.name,
            departmentId: editingCourse.departmentId || course.departmentId,
            departmentName: department.name,
            credits: editingCourse.credits || course.credits,
            status: editingCourse.status as 'active' | 'inactive' | 'pending' || course.status,
            description: editingCourse.description || course.description
          }
        : course
    ));

    setIsEditDialogOpen(false);
    setSelectedCourse(null);
    setEditingCourse({});
    toast.success('课程信息已更新');
  };

  // 处理删除课程
  const handleDeleteCourse = () => {
    if (!selectedCourse) return;

    setCourses(courses.filter(course => course.id !== selectedCourse.id));
    setIsDeleteDialogOpen(false);
    setSelectedCourse(null);
    toast.success('课程已删除');
  };

  // 打开编辑对话框
  const openEditDialog = (course: Course) => {
    setSelectedCourse(course);
    setEditingCourse({
      name: course.name,
      code: course.code,
      teacherId: course.teacherId,
      departmentId: course.departmentId,
      credits: course.credits,
      status: course.status,
      description: course.description
    });
    setIsEditDialogOpen(true);
  };

  // 打开删除对话框
  const openDeleteDialog = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteDialogOpen(true);
  };

  // 分页控制
  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 获取状态显示样式
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">进行中</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">已结束</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">待开始</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
      {/* 顶部导航 */}
      <PageHeader title="ClassSight 管理系统" welcomeText="欢迎，管理员" />

      {/* 导航菜单 */}
      <StudentNavigation role={2} />

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">课程管理</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            管理所有课程信息、教师分配和学生选课情况
          </p>
        </div>

        {/* 搜索和添加按钮区域 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索课程名称或代码..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            添加课程
          </Button>
        </div>

        {/* 课程列表 */}
        <Card>
          <CardHeader>
            <CardTitle>课程列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 text-left font-semibold">课程名称</th>
                    <th className="py-3 text-left font-semibold">课程代码</th>
                    <th className="py-3 text-left font-semibold">授课教师</th>
                    <th className="py-3 text-left font-semibold">所属学院</th>
                    <th className="py-3 text-left font-semibold">学分</th>
                    <th className="py-3 text-left font-semibold">学生人数</th>
                    <th className="py-3 text-left font-semibold">状态</th>
                    <th className="py-3 text-left font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCourses.length > 0 ? (
                    paginatedCourses.map((course) => (
                      <tr
                        key={course.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <td className="py-4">
                          <div className="font-medium">{course.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                            {course.description}
                          </div>
                        </td>
                        <td className="py-4">{course.code}</td>
                        <td className="py-4">{course.teacherName}</td>
                        <td className="py-4">{course.departmentName}</td>
                        <td className="py-4">{course.credits}</td>
                        <td className="py-4">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                          >
                            {course.studentCount}
                          </Badge>
                        </td>
                        <td className="py-4">
                          {getStatusBadge(course.status)}
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(course)}
                              className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog
                              open={
                                isDeleteDialogOpen &&
                                selectedCourse?.id === course.id
                              }
                              onOpenChange={setIsDeleteDialogOpen}
                            >
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>确认删除</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    您确定要删除课程「{course.name}
                                    」吗？此操作无法撤销。
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>取消</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDeleteCourse}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    删除
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-10 text-center text-gray-500 dark:text-gray-400"
                      >
                        没有找到符合条件的课程
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 分页控件 */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              显示{" "}
              {paginatedCourses.length > 0
                ? (currentPage - 1) * itemsPerPage + 1
                : 0}{" "}
              -{Math.min(currentPage * itemsPerPage, filteredCourses.length)}
              ，共 {filteredCourses.length} 条记录
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                上一页
              </Button>
              <span className="flex items-center justify-center px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md">
                {currentPage}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                下一页
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* 添加课程对话框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
            <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAddCourse}>添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑课程对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
            <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleEditCourse}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default CourseManagementPage;