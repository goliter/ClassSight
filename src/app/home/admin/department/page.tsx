/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import StudentNavigation from '@/components/StudentNavigation';
import { toast } from "sonner";
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import DepartmentList from '@/components/DepartmentList';

// 学院接口定义
interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  studentCount: number;
  teacherCount: number;
  courseCount: number;
}

// 导入新组件
import DepartmentAddDialog from '@/components/DepartmentAddDialog';
import DepartmentEditDialog from '@/components/DepartmentEditDialog';

// 在组件中使用
const DepartmentManagementPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  // 状态管理 - 支持多个管理员
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({ name: '', code: '', description: '' });
  const [editingDepartment, setEditingDepartment] = useState<Partial<Department>>({});
  const itemsPerPage = 10;

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 过滤数据
  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 分页
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );



  // 从API获取所有学院
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/department');
      const data = await response.json();
      
      if (response.ok) {
        // 确保每个学院对象都包含必需的字段，包括统计数据
        const departmentsWithStats = data.data.map((dept: any) => ({
          ...dept,
          studentCount: dept.studentCount || 0,
          teacherCount: dept.teacherCount || 0,
          courseCount: dept.courseCount || 0
        }));
        setDepartments(departmentsWithStats);
      } else {
        toast.error(data.error || '获取学院列表失败');
      }
    } catch (error) {
      console.error('获取学院列表错误:', error);
      toast.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 初始化时获取数据
  React.useEffect(() => {
    fetchDepartments();
  }, []);

  // 处理添加学院
  const handleAddDepartment = async () => {
    if (!newDepartment.name || !newDepartment.code) {
      toast.error('请填写学院名称和代码');
      return;
    }

    try {
      const response = await fetch('/api/department', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDepartment),
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsAddDialogOpen(false);
        setNewDepartment({ name: '', code: '', description: '' });
        toast.success('学院创建成功');
        // 重新获取学院列表
        await fetchDepartments();
      } else {
        toast.error(data.error || '创建学院失败');
      }
    } catch (error) {
      console.error('添加学院错误:', error);
      toast.error('网络错误，请稍后重试');
    }
  };

  // 处理编辑学院
  const handleEditDepartment = async () => {
    if (!selectedDepartment || !editingDepartment.name || !editingDepartment.code) {
      toast.error('请填写学院名称和代码');
      return;
    }

    try {
      const response = await fetch(`/api/department/${selectedDepartment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingDepartment),
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsEditDialogOpen(false);
        setSelectedDepartment(null);
        setEditingDepartment({});
        toast.success('学院信息已更新');
        // 重新获取学院列表
        await fetchDepartments();
      } else {
        toast.error(data.error || '更新学院信息失败');
      }
    } catch (error) {
      console.error('编辑学院错误:', error);
      toast.error('网络错误，请稍后重试');
    }
  };

  // 处理删除学院
  const handleDeleteDepartment = async () => {
    if (!selectedDepartment) return;

    try {
      const response = await fetch(`/api/department/${selectedDepartment.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsDeleteDialogOpen(false);
        setSelectedDepartment(null);
        toast.success('学院已删除');
        // 重新获取学院列表
        await fetchDepartments();
      } else {
        toast.error(data.error || '删除学院失败');
      }
    } catch (error) {
      console.error('删除学院错误:', error);
      toast.error('网络错误，请稍后重试');
    }
  };

  // 打开编辑对话框
  const openEditDialog = (department: Department) => {
    setSelectedDepartment(department);
    setEditingDepartment({ name: department.name, code: department.code, description: department.description });
    setIsEditDialogOpen(true);
  };

  // 打开删除对话框
  const openDeleteDialog = (department: Department) => {
    setSelectedDepartment(department);
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
          <h1 className="text-2xl font-bold mb-2">学院管理</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            管理所有学院信息、教师和学生数据
          </p>
        </div>

        {/* 使用提取的搜索栏组件 */}
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          placeholder="搜索学院名称或代码..."
          onAddClick={() => setIsAddDialogOpen(true)}
          addButtonText="添加学院"
        />

        {/* 加载状态 */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-gray-500">加载中...</div>
          </div>
        ) : (
          <>
            {/* 使用提取的学院列表组件 */}
            <DepartmentList
              departments={paginatedDepartments}
              selectedDepartment={selectedDepartment}
              isDeleteDialogOpen={isDeleteDialogOpen}
              onOpenEditDialog={openEditDialog}
              onOpenDeleteDialog={openDeleteDialog}
              onDeleteDepartment={handleDeleteDepartment}
              onSetDeleteDialogOpen={setIsDeleteDialogOpen}
            />
            
            {/* 空状态 */}
            {filteredDepartments.length === 0 && (
              <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">暂无学院数据</p>
              </div>
            )}
          </>
        )}

        {/* 使用提取的分页组件 */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredDepartments.length}
            itemsPerPage={itemsPerPage}
            onPageChange={goToPage}
          />
        )}

        {/* 添加学院对话框 */}
        <DepartmentAddDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          newDepartment={newDepartment}
          setNewDepartment={setNewDepartment}
          onAddDepartment={handleAddDepartment}
        />

        {/* 编辑学院对话框 */}
        <DepartmentEditDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          editingDepartment={editingDepartment}
          setEditingDepartment={setEditingDepartment}
          onEditDepartment={handleEditDepartment}
        />
      </main>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default DepartmentManagementPage;