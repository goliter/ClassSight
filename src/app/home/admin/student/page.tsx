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

// 学生接口定义
interface Student {
  id: string;
  name: string;
  studentId: string;
  departmentId: string;
  departmentName: string;
  major: string;
  grade: string;
  class: string;
  email: string;
  phone: string;
  enrollmentDate: string;
  status: 'active' | 'suspended' | 'graduated';
  courseCount: number;
}

// 部门接口定义
interface Department {
  id: string;
  name: string;
}

const StudentManagementPage: React.FC = () => {
  // 模拟学生数据
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: '张三',
      studentId: '20230001',
      departmentId: '1',
      departmentName: '信息科学与技术学院',
      major: '计算机科学与技术',
      grade: '2023',
      class: '计算机1班',
      email: 'zhang.san@example.com',
      phone: '13800138001',
      enrollmentDate: '2023-09-01',
      status: 'active',
      courseCount: 5
    },
    {
      id: '2',
      name: '李四',
      studentId: '20230002',
      departmentId: '1',
      departmentName: '信息科学与技术学院',
      major: '软件工程',
      grade: '2023',
      class: '软件2班',
      email: 'li.si@example.com',
      phone: '13800138002',
      enrollmentDate: '2023-09-01',
      status: 'active',
      courseCount: 6
    },
    {
      id: '3',
      name: '王五',
      studentId: '20220001',
      departmentId: '2',
      departmentName: '人工智能学院',
      major: '人工智能',
      grade: '2022',
      class: '智能1班',
      email: 'wang.wu@example.com',
      phone: '13800138003',
      enrollmentDate: '2022-09-01',
      status: 'active',
      courseCount: 4
    },
    {
      id: '4',
      name: '赵六',
      studentId: '20210001',
      departmentId: '3',
      departmentName: '数学与统计学院',
      major: '应用数学',
      grade: '2021',
      class: '数学1班',
      email: 'zhao.liu@example.com',
      phone: '13800138004',
      enrollmentDate: '2021-09-01',
      status: 'graduated',
      courseCount: 0
    },
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
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    studentId: '',
    departmentId: '',
    major: '',
    grade: '2023',
    class: '',
    email: '',
    phone: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    status: 'active'
  });
  const [editingStudent, setEditingStudent] = useState<Partial<Student>>({});
  const itemsPerPage = 10;

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 过滤数据
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.includes(searchTerm) ||
    student.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 分页
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 处理添加学生
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.studentId || !newStudent.departmentId || !newStudent.major) {
      toast.error('请填写学生姓名、学号、所属学院和专业');
      return;
    }

    const department = departments.find(d => d.id === newStudent.departmentId);
    if (!department) {
      toast.error('请选择有效的学院');
      return;
    }

    const student: Student = {
      id: (students.length + 1).toString(),
      name: newStudent.name || '',
      studentId: newStudent.studentId || '',
      departmentId: newStudent.departmentId || '',
      departmentName: department.name,
      major: newStudent.major || '',
      grade: newStudent.grade || '2023',
      class: newStudent.class || '',
      email: newStudent.email || '',
      phone: newStudent.phone || '',
      enrollmentDate: newStudent.enrollmentDate || new Date().toISOString().split('T')[0],
      status: newStudent.status as 'active' | 'suspended' | 'graduated' || 'active',
      courseCount: 0
    };

    setStudents([...students, student]);
    setIsAddDialogOpen(false);
    setNewStudent({
      name: '',
      studentId: '',
      departmentId: '',
      major: '',
      grade: '2023',
      class: '',
      email: '',
      phone: '',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active'
    });
    toast.success('学生信息添加成功');
  };

  // 处理编辑学生
  const handleEditStudent = () => {
    if (!selectedStudent || !editingStudent.name || !editingStudent.studentId || !editingStudent.departmentId || !editingStudent.major) {
      toast.error('请填写学生姓名、学号、所属学院和专业');
      return;
    }

    const department = departments.find(d => d.id === editingStudent.departmentId);
    if (!department) {
      toast.error('请选择有效的学院');
      return;
    }

    setStudents(students.map(student => 
      student.id === selectedStudent.id
        ? {
            ...student,
            name: editingStudent.name || student.name,
            studentId: editingStudent.studentId || student.studentId,
            departmentId: editingStudent.departmentId || student.departmentId,
            departmentName: department.name,
            major: editingStudent.major || student.major,
            grade: editingStudent.grade || student.grade,
            class: editingStudent.class || student.class,
            email: editingStudent.email || student.email,
            phone: editingStudent.phone || student.phone,
            enrollmentDate: editingStudent.enrollmentDate || student.enrollmentDate,
            status: editingStudent.status as 'active' | 'suspended' | 'graduated' || student.status
          }
        : student
    ));

    setIsEditDialogOpen(false);
    setSelectedStudent(null);
    setEditingStudent({});
    toast.success('学生信息已更新');
  };

  // 处理删除学生
  const handleDeleteStudent = () => {
    if (!selectedStudent) return;

    setStudents(students.filter(student => student.id !== selectedStudent.id));
    setIsDeleteDialogOpen(false);
    setSelectedStudent(null);
    toast.success('学生信息已删除');
  };

  // 打开编辑对话框
  const openEditDialog = (student: Student) => {
    setSelectedStudent(student);
    setEditingStudent({
      name: student.name,
      studentId: student.studentId,
      departmentId: student.departmentId,
      major: student.major,
      grade: student.grade,
      class: student.class,
      email: student.email,
      phone: student.phone,
      enrollmentDate: student.enrollmentDate,
      status: student.status
    });
    setIsEditDialogOpen(true);
  };

  // 打开删除对话框
  const openDeleteDialog = (student: Student) => {
    setSelectedStudent(student);
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
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">在读</Badge>;
      case 'suspended':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">休学</Badge>;
      case 'graduated':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">毕业</Badge>;
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
          <h1 className="text-2xl font-bold mb-2">学生管理</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            管理所有学生信息、学籍状态和选课情况
          </p>
        </div>

        {/* 搜索和添加按钮区域 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索学生姓名或学号..."
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
            添加学生
          </Button>
        </div>

        {/* 学生列表 */}
        <Card>
          <CardHeader>
            <CardTitle>学生列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 text-left font-semibold">姓名</th>
                    <th className="py-3 text-left font-semibold">学号</th>
                    <th className="py-3 text-left font-semibold">所属学院</th>
                    <th className="py-3 text-left font-semibold">专业</th>
                    <th className="py-3 text-left font-semibold">年级班级</th>
                    <th className="py-3 text-left font-semibold">邮箱</th>
                    <th className="py-3 text-left font-semibold">电话</th>
                    <th className="py-3 text-left font-semibold">状态</th>
                    <th className="py-3 text-left font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.length > 0 ? (
                    paginatedStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <td className="py-4 font-medium">{student.name}</td>
                        <td className="py-4">{student.studentId}</td>
                        <td className="py-4">{student.departmentName}</td>
                        <td className="py-4">{student.major}</td>
                        <td className="py-4">
                          {student.grade}级{student.class}
                        </td>
                        <td className="py-4">
                          <a
                            href={`mailto:${student.email}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {student.email}
                          </a>
                        </td>
                        <td className="py-4">{student.phone}</td>
                        <td className="py-4">
                          {getStatusBadge(student.status)}
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(student)}
                              className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog
                              open={
                                isDeleteDialogOpen &&
                                selectedStudent?.id === student.id
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
                                    您确定要删除学生「{student.name}
                                    」的信息吗？此操作无法撤销。
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>取消</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDeleteStudent}
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
                        colSpan={9}
                        className="py-10 text-center text-gray-500 dark:text-gray-400"
                      >
                        没有找到符合条件的学生
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
              {paginatedStudents.length > 0
                ? (currentPage - 1) * itemsPerPage + 1
                : 0}{" "}
              -{Math.min(currentPage * itemsPerPage, filteredStudents.length)}
              ，共 {filteredStudents.length} 条记录
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

      {/* 添加学生对话框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
            <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAddStudent}>添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑学生对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
            <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleEditStudent}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default StudentManagementPage;