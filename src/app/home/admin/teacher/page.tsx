"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import StudentNavigation from '@/components/StudentNavigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import TeacherList from '@/components/TeacherList';

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

// 导入新组件
import TeacherAddDialog from '@/components/TeacherAddDialog';
import TeacherEditDialog from '@/components/TeacherEditDialog';

// 在组件中使用
const TeacherManagementPage: React.FC = () => {
  // 模拟教师数据
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: '1', name: '张教授', teacherId: 'T10001', departmentId: '1', departmentName: '信息科学与技术学院', rank: '教授', email: 'zhang.prof@example.com', phone: '13900139001', office: '科技楼401室', hireDate: '2010-09-01', status: 'active', courseCount: 3, studentCount: 120 },
    { id: '2', name: '李副教授', teacherId: 'T10002', departmentId: '1', departmentName: '信息科学与技术学院', rank: '副教授', email: 'li.assoc@example.com', phone: '13900139002', office: '科技楼402室', hireDate: '2015-09-01', status: 'active', courseCount: 4, studentCount: 150 },
    { id: '3', name: '王讲师', teacherId: 'T10003', departmentId: '2', departmentName: '人工智能学院', rank: '讲师', email: 'wang.lect@example.com', phone: '13900139003', office: '智能楼301室', hireDate: '2020-09-01', status: 'onLeave', courseCount: 0, studentCount: 0 },
    { id: '4', name: '赵助教', teacherId: 'T10004', departmentId: '3', departmentName: '数学与统计学院', rank: '助教', email: 'zhao.assist@example.com', phone: '13900139004', office: '数理楼201室', hireDate: '2022-09-01', status: 'resigned', courseCount: 0, studentCount: 0 },
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
    name: '', teacherId: '', departmentId: '', rank: '讲师', email: '', phone: '', office: '', hireDate: new Date().toISOString().split('T')[0], status: 'active'
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
    setNewTeacher({ name: '', teacherId: '', departmentId: '', rank: '讲师', email: '', phone: '', office: '', hireDate: new Date().toISOString().split('T')[0], status: 'active' });
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
        ? { ...teacher, name: editingTeacher.name || teacher.name, teacherId: editingTeacher.teacherId || teacher.teacherId, departmentId: editingTeacher.departmentId || teacher.departmentId, departmentName: department.name, rank: editingTeacher.rank || teacher.rank, email: editingTeacher.email || teacher.email, phone: editingTeacher.phone || teacher.phone, office: editingTeacher.office || teacher.office, hireDate: editingTeacher.hireDate || teacher.hireDate, status: editingTeacher.status as 'active' | 'onLeave' | 'resigned' || teacher.status }
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
    setEditingTeacher({ name: teacher.name, teacherId: teacher.teacherId, departmentId: teacher.departmentId, rank: teacher.rank, email: teacher.email, phone: teacher.phone, office: teacher.office, hireDate: teacher.hireDate, status: teacher.status });
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
        {/* 使用提取的搜索栏组件 */}
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          placeholder="搜索教师姓名或工号..."
          onAddClick={() => setIsAddDialogOpen(true)}
          addButtonText="添加教师"
        />
        {/* 使用提取的教师列表组件 */}
        <TeacherList
          teachers={paginatedTeachers}
          selectedTeacher={selectedTeacher}
          isDeleteDialogOpen={isDeleteDialogOpen}
          onOpenEditDialog={openEditDialog}
          onOpenDeleteDialog={openDeleteDialog}
          onDeleteTeacher={handleDeleteTeacher}
          onSetDeleteDialogOpen={setIsDeleteDialogOpen}
        />
        {/* 使用提取的分页组件 */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredTeachers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={goToPage}
          />
        )}
        {/* 添加教师对话框 - 使用组件 */}
        <TeacherAddDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          newTeacher={newTeacher}
          setNewTeacher={setNewTeacher}
          departments={departments}
          onAddTeacher={handleAddTeacher}
        />
        {/* 编辑教师对话框 - 使用组件 */}
        <TeacherEditDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          editingTeacher={editingTeacher}
          setEditingTeacher={setEditingTeacher}
          departments={departments}
          onEditTeacher={handleEditTeacher}
        />
      </main>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default TeacherManagementPage;