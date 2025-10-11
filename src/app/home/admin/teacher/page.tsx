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

// 教师接口定义
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

// 部门接口定义
interface Department {
  id: string;
  name: string;
}

const TeacherManagementPage: React.FC = () => {
  // 模拟教师数据
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      name: '张教授',
      teacherId: 'T10001',
      departmentId: '1',
      departmentName: '信息科学与技术学院',
      rank: '教授',
      email: 'zhang.prof@example.com',
      phone: '13900139001',
      office: '科技楼401室',
      hireDate: '2010-09-01',
      status: 'active',
      courseCount: 3,
      studentCount: 120
    },
    {
      id: '2',
      name: '李副教授',
      teacherId: 'T10002',
      departmentId: '1',
      departmentName: '信息科学与技术学院',
      rank: '副教授',
      email: 'li.assoc@example.com',
      phone: '13900139002',
      office: '科技楼402室',
      hireDate: '2015-09-01',
      status: 'active',
      courseCount: 4,
      studentCount: 150
    },
    {
      id: '3',
      name: '王讲师',
      teacherId: 'T10003',
      departmentId: '2',
      departmentName: '人工智能学院',
      rank: '讲师',
      email: 'wang.lect@example.com',
      phone: '13900139003',
      office: '智能楼301室',
      hireDate: '2020-09-01',
      status: 'onLeave',
      courseCount: 0,
      studentCount: 0
    },
    {
      id: '4',
      name: '赵助教',
      teacherId: 'T10004',
      departmentId: '3',
      departmentName: '数学与统计学院',
      rank: '助教',
      email: 'zhao.assist@example.com',
      phone: '13900139004',
      office: '数理楼201室',
      hireDate: '2022-09-01',
      status: 'resigned',
      courseCount: 0,
      studentCount: 0
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
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({
    name: '',
    teacherId: '',
    departmentId: '',
    rank: '讲师',
    email: '',
    phone: '',
    office: '',
    hireDate: new Date().toISOString().split('T')[0],
    status: 'active'
  });
  const [editingTeacher, setEditingTeacher] = useState<Partial<Teacher>>({});
  const itemsPerPage = 10;

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 过滤数据
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.teacherId.includes(searchTerm) ||
    teacher.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.rank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 分页
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 处理添加教师
  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.teacherId || !newTeacher.departmentId || !newTeacher.rank) {
      toast.error('请填写教师姓名、工号、所属学院和职称');
      return;
    }

    const department = departments.find(d => d.id === newTeacher.departmentId);
    if (!department) {
      toast.error('请选择有效的学院');
      return;
    }

    const teacher: Teacher = {
      id: (teachers.length + 1).toString(),
      name: newTeacher.name || '',
      teacherId: newTeacher.teacherId || '',
      departmentId: newTeacher.departmentId || '',
      departmentName: department.name,
      rank: newTeacher.rank || '讲师',
      email: newTeacher.email || '',
      phone: newTeacher.phone || '',
      office: newTeacher.office || '',
      hireDate: newTeacher.hireDate || new Date().toISOString().split('T')[0],
      status: newTeacher.status as 'active' | 'onLeave' | 'resigned' || 'active',
      courseCount: 0,
      studentCount: 0
    };

    setTeachers([...teachers, teacher]);
    setIsAddDialogOpen(false);
    setNewTeacher({
      name: '',
      teacherId: '',
      departmentId: '',
      rank: '讲师',
      email: '',
      phone: '',
      office: '',
      hireDate: new Date().toISOString().split('T')[0],
      status: 'active'
    });
    toast.success('教师信息添加成功');
  };

  // 处理编辑教师
  const handleEditTeacher = () => {
    if (!selectedTeacher || !editingTeacher.name || !editingTeacher.teacherId || !editingTeacher.departmentId || !editingTeacher.rank) {
      toast.error('请填写教师姓名、工号、所属学院和职称');
      return;
    }

    const department = departments.find(d => d.id === editingTeacher.departmentId);
    if (!department) {
      toast.error('请选择有效的学院');
      return;
    }

    setTeachers(teachers.map(teacher => 
      teacher.id === selectedTeacher.id
        ? {
            ...teacher,
            name: editingTeacher.name || teacher.name,
            teacherId: editingTeacher.teacherId || teacher.teacherId,
            departmentId: editingTeacher.departmentId || teacher.departmentId,
            departmentName: department.name,
            rank: editingTeacher.rank || teacher.rank,
            email: editingTeacher.email || teacher.email,
            phone: editingTeacher.phone || teacher.phone,
            office: editingTeacher.office || teacher.office,
            hireDate: editingTeacher.hireDate || teacher.hireDate,
            status: editingTeacher.status as 'active' | 'onLeave' | 'resigned' || teacher.status
          }
        : teacher
    ));

    setIsEditDialogOpen(false);
    setSelectedTeacher(null);
    setEditingTeacher({});
    toast.success('教师信息已更新');
  };

  // 处理删除教师
  const handleDeleteTeacher = () => {
    if (!selectedTeacher) return;

    setTeachers(teachers.filter(teacher => teacher.id !== selectedTeacher.id));
    setIsDeleteDialogOpen(false);
    setSelectedTeacher(null);
    toast.success('教师信息已删除');
  };

  // 打开编辑对话框
  const openEditDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setEditingTeacher({
      name: teacher.name,
      teacherId: teacher.teacherId,
      departmentId: teacher.departmentId,
      rank: teacher.rank,
      email: teacher.email,
      phone: teacher.phone,
      office: teacher.office,
      hireDate: teacher.hireDate,
      status: teacher.status
    });
    setIsEditDialogOpen(true);
  };

  // 打开删除对话框
  const openDeleteDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
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
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">在职</Badge>;
      case 'onLeave':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">休假</Badge>;
      case 'resigned':
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">离职</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // 获取职称显示样式
  const getRankBadge = (rank: string) => {
    switch (rank) {
      case '教授':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">教授</Badge>;
      case '副教授':
        return <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">副教授</Badge>;
      case '讲师':
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">讲师</Badge>;
      case '助教':
        return <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300">助教</Badge>;
      default:
        return <Badge>{rank}</Badge>;
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
          <h1 className="text-2xl font-bold mb-2">教师管理</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            管理所有教师信息、授课情况和工作状态
          </p>
        </div>

        {/* 搜索和添加按钮区域 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索教师姓名或工号..."
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
            添加教师
          </Button>
        </div>

        {/* 教师列表 */}
        <Card>
          <CardHeader>
            <CardTitle>教师列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 text-left font-semibold">姓名</th>
                    <th className="py-3 text-left font-semibold">工号</th>
                    <th className="py-3 text-left font-semibold">所属学院</th>
                    <th className="py-3 text-left font-semibold">职称</th>
                    <th className="py-3 text-left font-semibold">邮箱</th>
                    <th className="py-3 text-left font-semibold">电话</th>
                    <th className="py-3 text-left font-semibold">办公室</th>
                    <th className="py-3 text-left font-semibold">状态</th>
                    <th className="py-3 text-left font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTeachers.length > 0 ? (
                    paginatedTeachers.map((teacher) => (
                      <tr
                        key={teacher.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <td className="py-4 font-medium">{teacher.name}</td>
                        <td className="py-4">{teacher.teacherId}</td>
                        <td className="py-4">{teacher.departmentName}</td>
                        <td className="py-4">{getRankBadge(teacher.rank)}</td>
                        <td className="py-4">
                          <a
                            href={`mailto:${teacher.email}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {teacher.email}
                          </a>
                        </td>
                        <td className="py-4">{teacher.phone}</td>
                        <td className="py-4">{teacher.office}</td>
                        <td className="py-4">
                          {getStatusBadge(teacher.status)}
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(teacher)}
                              className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog
                              open={
                                isDeleteDialogOpen &&
                                selectedTeacher?.id === teacher.id
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
                                    您确定要删除教师「{teacher.name}
                                    」的信息吗？此操作无法撤销。
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>取消</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDeleteTeacher}
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
                        没有找到符合条件的教师
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
              {paginatedTeachers.length > 0
                ? (currentPage - 1) * itemsPerPage + 1
                : 0}{" "}
              -{Math.min(currentPage * itemsPerPage, filteredTeachers.length)}
              ，共 {filteredTeachers.length} 条记录
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

      {/* 添加教师对话框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>添加教师</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="teacherName" className="text-right font-medium">
                姓名
              </label>
              <Input
                id="teacherName"
                placeholder="请输入教师姓名"
                value={newTeacher.name || ""}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="teacherId" className="text-right font-medium">
                工号
              </label>
              <Input
                id="teacherId"
                placeholder="请输入工号"
                value={newTeacher.teacherId || ""}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, teacherId: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="teacherDepartment"
                className="text-right font-medium"
              >
                所属学院
              </label>
              <Select
                value={newTeacher.departmentId || ""}
                onValueChange={(value) =>
                  setNewTeacher({ ...newTeacher, departmentId: value })
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
              <label htmlFor="teacherRank" className="text-right font-medium">
                职称
              </label>
              <Select
                value={newTeacher.rank || "讲师"}
                onValueChange={(value) =>
                  setNewTeacher({ ...newTeacher, rank: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="选择职称" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="教授">教授</SelectItem>
                  <SelectItem value="副教授">副教授</SelectItem>
                  <SelectItem value="讲师">讲师</SelectItem>
                  <SelectItem value="助教">助教</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="teacherEmail" className="text-right font-medium">
                邮箱
              </label>
              <Input
                id="teacherEmail"
                type="email"
                placeholder="请输入邮箱"
                value={newTeacher.email || ""}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="teacherPhone" className="text-right font-medium">
                电话
              </label>
              <Input
                id="teacherPhone"
                placeholder="请输入电话"
                value={newTeacher.phone || ""}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, phone: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="teacherOffice" className="text-right font-medium">
                办公室
              </label>
              <Input
                id="teacherOffice"
                placeholder="请输入办公室"
                value={newTeacher.office || ""}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, office: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="teacherHireDate"
                className="text-right font-medium"
              >
                入职日期
              </label>
              <Input
                id="teacherHireDate"
                type="date"
                value={
                  newTeacher.hireDate || new Date().toISOString().split("T")[0]
                }
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, hireDate: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="teacherStatus" className="text-right font-medium">
                状态
              </label>
              <Select
                value={(newTeacher.status as string) || "active"}
                onValueChange={(value) =>
                  setNewTeacher({
                    ...newTeacher,
                    status: value as "active" | "onLeave" | "resigned",
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">在职</SelectItem>
                  <SelectItem value="onLeave">休假</SelectItem>
                  <SelectItem value="resigned">离职</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAddTeacher}>添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑教师对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>编辑教师</DialogTitle>
          </DialogHeader>
          {selectedTeacher && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="editTeacherName"
                  className="text-right font-medium"
                >
                  姓名
                </label>
                <Input
                  id="editTeacherName"
                  placeholder="请输入教师姓名"
                  value={editingTeacher.name || ""}
                  onChange={(e) =>
                    setEditingTeacher({
                      ...editingTeacher,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="editTeacherId"
                  className="text-right font-medium"
                >
                  工号
                </label>
                <Input
                  id="editTeacherId"
                  placeholder="请输入工号"
                  value={editingTeacher.teacherId || ""}
                  onChange={(e) =>
                    setEditingTeacher({
                      ...editingTeacher,
                      teacherId: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="editTeacherDepartment"
                  className="text-right font-medium"
                >
                  所属学院
                </label>
                <Select
                  value={editingTeacher.departmentId || ""}
                  onValueChange={(value) =>
                    setEditingTeacher({
                      ...editingTeacher,
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
                  htmlFor="editTeacherRank"
                  className="text-right font-medium"
                >
                  职称
                </label>
                <Select
                  value={editingTeacher.rank || "讲师"}
                  onValueChange={(value) =>
                    setEditingTeacher({ ...editingTeacher, rank: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择职称" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="教授">教授</SelectItem>
                    <SelectItem value="副教授">副教授</SelectItem>
                    <SelectItem value="讲师">讲师</SelectItem>
                    <SelectItem value="助教">助教</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="editTeacherEmail"
                  className="text-right font-medium"
                >
                  邮箱
                </label>
                <Input
                  id="editTeacherEmail"
                  type="email"
                  placeholder="请输入邮箱"
                  value={editingTeacher.email || ""}
                  onChange={(e) =>
                    setEditingTeacher({
                      ...editingTeacher,
                      email: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="editTeacherPhone"
                  className="text-right font-medium"
                >
                  电话
                </label>
                <Input
                  id="editTeacherPhone"
                  placeholder="请输入电话"
                  value={editingTeacher.phone || ""}
                  onChange={(e) =>
                    setEditingTeacher({
                      ...editingTeacher,
                      phone: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="editTeacherOffice"
                  className="text-right font-medium"
                >
                  办公室
                </label>
                <Input
                  id="editTeacherOffice"
                  placeholder="请输入办公室"
                  value={editingTeacher.office || ""}
                  onChange={(e) =>
                    setEditingTeacher({
                      ...editingTeacher,
                      office: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="editTeacherHireDate"
                  className="text-right font-medium"
                >
                  入职日期
                </label>
                <Input
                  id="editTeacherHireDate"
                  type="date"
                  value={
                    editingTeacher.hireDate ||
                    new Date().toISOString().split("T")[0]
                  }
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
                <label
                  htmlFor="editTeacherStatus"
                  className="text-right font-medium"
                >
                  状态
                </label>
                <Select
                  value={(editingTeacher.status as string) || "active"}
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
                    <SelectItem value="active">在职</SelectItem>
                    <SelectItem value="onLeave">休假</SelectItem>
                    <SelectItem value="resigned">离职</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleEditTeacher}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default TeacherManagementPage;