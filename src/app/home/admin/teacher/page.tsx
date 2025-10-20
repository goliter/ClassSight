"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import StudentNavigation from '@/components/StudentNavigation';
import { toast } from "sonner";
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import TeacherList from '@/components/TeacherList';

// 教师接口定义
interface Teacher {
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
  password?: string; // 添加密码字段
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
  // 教师数据状态
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  // 部门数据状态
  const [departments, setDepartments] = useState<Department[]>([]);
  // 加载状态
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 状态管理
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({
    name: '', teacherId: '', departmentId: '', rank: '讲师', email: '', phone: '', office: '', hireDate: new Date().toISOString().split('T')[0], status: 'active', password: ''
  });
  const [editingTeacher, setEditingTeacher] = useState<Partial<Teacher>>({});
  const itemsPerPage = 10;

  // 获取所有教师数据
  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/teacher', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('获取教师数据失败');
      }
      
      const data = await response.json();
      if (data.status === 'success') {
        setTeachers(data.data);
      } else {
        toast.error(data.message || '获取教师数据失败');
      }
    } catch (error) {
      console.error('获取教师数据错误:', error);
      toast.error('获取教师数据时发生错误');
    } finally {
      setIsLoading(false);
    }
  };

  // 获取所有部门数据
  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/department', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('获取部门数据失败');
      }
      
      const data = await response.json();
      if (data.status === 'success') {
        setDepartments(data.data);
      }
    } catch (error) {
      console.error('获取部门数据错误:', error);
    }
  };

  // 组件挂载时获取数据
  React.useEffect(() => {
    fetchTeachers();
    fetchDepartments();
  }, []);

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
  const handleAddTeacher = async () => {
    // 逐个验证必填字段，提供更具体的错误提示
    if (!newTeacher.name || newTeacher.name.trim() === '') {
      toast.error('请填写教师姓名');
      return;
    }
    
    if (!newTeacher.teacherId || newTeacher.teacherId.trim() === '') {
      toast.error('请填写教师工号');
      return;
    }
    
    if (!newTeacher.password || newTeacher.password.trim() === '') {
      toast.error('请设置教师密码');
      return;
    }
    
    if (newTeacher.password && newTeacher.password.length < 6) {
      toast.error('密码长度至少为6位');
      return;
    }
    
    if (!newTeacher.departmentId) {
      toast.error('请选择所属学院');
      return;
    }
    
    if (!newTeacher.rank) {
      toast.error('请选择教师职称');
      return;
    }

    const department = departments.find(d => d.id === newTeacher.departmentId);
    if (!department) {
      toast.error('请选择有效的学院');
      return;
    }

    setIsSubmitting(true);
    try {
      // 确保hireDate以ISO-8601格式发送，并根据Prisma要求使用嵌套的department对象格式
      const { departmentId,  ...otherTeacherData } = newTeacher;
      
      const teacherData = {
        ...otherTeacherData,
        hireDate: newTeacher.hireDate ? new Date(newTeacher.hireDate).toISOString() : new Date().toISOString(),
        // 使用department.connect来关联现有部门
        department: departmentId ? { connect: { id: departmentId } } : undefined
      };
      
      const response = await fetch('/api/teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(teacherData)
      });
      
      if (!response.ok) {
        throw new Error('添加教师失败');
      }
      
      const data = await response.json();
      if (data.status === 'success') {
        // 重新获取教师列表以包含新添加的教师
        await fetchTeachers();
        setIsAddDialogOpen(false);
        setNewTeacher({ name: '', teacherId: '', departmentId: '', rank: '讲师', email: '', phone: '', office: '', hireDate: new Date().toISOString().split('T')[0], status: 'active', password: '' });
        toast.success(data.message || '教师信息添加成功');
      } else {
        toast.error(data.message || '添加教师失败');
      }
    } catch (error) {
      console.error('添加教师错误:', error);
      toast.error('添加教师时发生错误');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 处理编辑教师
  const handleEditTeacher = async () => {
    if (!selectedTeacher || !editingTeacher.name || !editingTeacher.teacherId || !editingTeacher.departmentId || !editingTeacher.rank) {
      toast.error('请填写教师姓名、工号、所属学院和职称');
      return;
    }

    const department = departments.find(d => d.id === editingTeacher.departmentId);
    if (!department) {
      toast.error('请选择有效的学院');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/teacher/${selectedTeacher.teacherId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editingTeacher)
      });
      
      if (!response.ok) {
        throw new Error('更新教师信息失败');
      }
      
      const data = await response.json();
      if (data.status === 'success') {
        // 重新获取教师列表以包含更新后的教师信息
        await fetchTeachers();
        setIsEditDialogOpen(false);
        setSelectedTeacher(null);
        setEditingTeacher({});
        toast.success(data.message || '教师信息已更新');
      } else {
        toast.error(data.message || '更新教师信息失败');
      }
    } catch (error) {
      console.error('更新教师信息错误:', error);
      toast.error('更新教师信息时发生错误');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 处理删除教师
  const handleDeleteTeacher = async () => {
    if (!selectedTeacher) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/teacher/${selectedTeacher.teacherId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('删除教师失败');
      }
      
      const data = await response.json();
      if (data.status === 'success') {
        // 重新获取教师列表以移除已删除的教师
        await fetchTeachers();
        setIsDeleteDialogOpen(false);
        setSelectedTeacher(null);
        toast.success(data.message || '教师信息已删除');
      } else {
        toast.error(data.message || '删除教师失败');
      }
    } catch (error) {
      console.error('删除教师错误:', error);
      toast.error('删除教师时发生错误');
    } finally {
      setIsSubmitting(false);
    }
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
        {/* 加载状态 */}
        {isLoading ? (
          <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-8 flex justify-center items-center">
            <p className="text-gray-500 dark:text-gray-400">正在加载教师数据...</p>
          </div>
        ) : paginatedTeachers.length === 0 ? (
          <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">暂无教师数据</p>
          </div>
        ) : (
          /* 使用提取的教师列表组件 */
          <TeacherList
            teachers={paginatedTeachers}
            selectedTeacher={selectedTeacher}
            isDeleteDialogOpen={isDeleteDialogOpen}
            onOpenEditDialog={openEditDialog}
            onOpenDeleteDialog={openDeleteDialog}
            onDeleteTeacher={handleDeleteTeacher}
            onSetDeleteDialogOpen={setIsDeleteDialogOpen}
          />
        )}
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
          isSubmitting={isSubmitting}
        />
        {/* 编辑教师对话框 - 使用组件 */}
        <TeacherEditDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          editingTeacher={editingTeacher}
          setEditingTeacher={setEditingTeacher}
          departments={departments}
          onEditTeacher={handleEditTeacher}
          isSubmitting={isSubmitting}
        />
      </main>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default TeacherManagementPage;