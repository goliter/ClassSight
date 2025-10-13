"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import StudentNavigation from '@/components/StudentNavigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import DepartmentList from '@/components/DepartmentList';
import { X } from 'lucide-react';
import AdminBadge from '@/components/AdminBadge';

// 学院接口定义
interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  adminIds: string[];
  adminNames: string[];
  studentCount: number;
  teacherCount: number;
  courseCount: number;
}

// 管理员接口定义
interface Admin {
  id: string;
  name: string;
  role: string;
}

// 导入新组件
import DepartmentAddDialog from '@/components/DepartmentAddDialog';
import DepartmentEditDialog from '@/components/DepartmentEditDialog';

// 在组件中使用
const DepartmentManagementPage: React.FC = () => {
  // 模拟数据 - 支持多个管理员
  const [departments, setDepartments] = useState<Department[]>([
    { id: '1', name: '信息科学与技术学院', code: 'IST', description: '专注于计算机科学、软件工程和信息安全等领域的教学与研究', adminIds: ['AD10001', 'AD10002'], adminNames: ['张教授', '李教授'], studentCount: 1200, teacherCount: 85, courseCount: 120 },
    { id: '2', name: '人工智能学院', code: 'AI', description: '培养人工智能领域的专业人才，研究机器学习、深度学习等前沿技术', adminIds: ['AD10003'], adminNames: ['王教授'], studentCount: 850, teacherCount: 62, courseCount: 95 },
    { id: '3', name: '数学与统计学院', code: 'MAS', description: '提供数学、应用数学和统计学等专业的教育与研究', adminIds: [], adminNames: [], studentCount: 680, teacherCount: 45, courseCount: 80 },
  ]);

  // 模拟管理员数据
  const [admins] = useState<Admin[]>([
    { id: 'AD10001', name: '张教授', role: '系统管理员' },
    { id: 'AD10002', name: '李教授', role: '学院管理员' },
    { id: 'AD10003', name: '王教授', role: '学院管理员' },
    { id: 'AD10004', name: '赵教授', role: '学院管理员' },
  ]);

  // 状态管理 - 支持多个管理员
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({ name: '', code: '', description: '', adminIds: [], adminNames: [] });
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

  // 处理添加学院管理员
  const handleAddAdmin = (adminId: string) => {
    if (!newDepartment.adminIds?.includes(adminId)) {
      const admin = admins.find(a => a.id === adminId);
      if (admin) {
        setNewDepartment(prev => ({
          ...prev,
          adminIds: [...(prev.adminIds || []), adminId],
          adminNames: [...(prev.adminNames || []), admin.name]
        }));
      }
    }
  };

  // 处理移除学院管理员
  const handleRemoveAdmin = (adminId: string) => {
    setNewDepartment(prev => {
      const adminIds = prev.adminIds || [];
      const adminNames = prev.adminNames || [];
      const index = adminIds.indexOf(adminId);
      if (index > -1) {
        return {
          ...prev,
          adminIds: [...adminIds.slice(0, index), ...adminIds.slice(index + 1)],
          adminNames: [...adminNames.slice(0, index), ...adminNames.slice(index + 1)]
        };
      }
      return prev;
    });
  };

  // 处理编辑学院时添加管理员
  const handleEditAddAdmin = (adminId: string) => {
    if (!editingDepartment.adminIds?.includes(adminId)) {
      const admin = admins.find(a => a.id === adminId);
      if (admin) {
        setEditingDepartment(prev => ({
          ...prev,
          adminIds: [...(prev.adminIds || []), adminId],
          adminNames: [...(prev.adminNames || []), admin.name]
        }));
      }
    }
  };

  // 处理编辑学院时移除管理员
  const handleEditRemoveAdmin = (adminId: string) => {
    setEditingDepartment(prev => {
      const adminIds = prev.adminIds || [];
      const adminNames = prev.adminNames || [];
      const index = adminIds.indexOf(adminId);
      if (index > -1) {
        return {
          ...prev,
          adminIds: [...adminIds.slice(0, index), ...adminIds.slice(index + 1)],
          adminNames: [...adminNames.slice(0, index), ...adminNames.slice(index + 1)]
        };
      }
      return prev;
    });
  };

  // 处理添加学院 - 不要求必须有管理员
  const handleAddDepartment = () => {
    if (!newDepartment.name || !newDepartment.code) {
      toast.error('请填写学院名称和代码');
      return;
    }

    const department: Department = {
      id: (departments.length + 1).toString(),
      name: newDepartment.name || '',
      code: newDepartment.code || '',
      description: newDepartment.description || '',
      adminIds: newDepartment.adminIds || [],
      adminNames: newDepartment.adminNames || [],
      studentCount: 0,
      teacherCount: 0,
      courseCount: 0
    };

    setDepartments([...departments, department]);
    setIsAddDialogOpen(false);
    setNewDepartment({ name: '', code: '', description: '', adminIds: [], adminNames: [] });
    toast.success('学院创建成功');
  };

  // 处理编辑学院 - 支持多个管理员
  const handleEditDepartment = () => {
    if (!selectedDepartment || !editingDepartment.name || !editingDepartment.code) {
      toast.error('请填写学院名称和代码');
      return;
    }

    setDepartments(departments.map(dept => 
      dept.id === selectedDepartment.id
        ? { ...dept, name: editingDepartment.name || dept.name, code: editingDepartment.code || dept.code, description: editingDepartment.description || dept.description, adminIds: editingDepartment.adminIds || dept.adminIds, adminNames: editingDepartment.adminNames || dept.adminNames }
        : dept
    ));

    setIsEditDialogOpen(false);
    setSelectedDepartment(null);
    setEditingDepartment({});
    toast.success('学院信息已更新');
  };

  // 处理删除学院
  const handleDeleteDepartment = () => {
    if (!selectedDepartment) return;

    setDepartments(departments.filter(dept => dept.id !== selectedDepartment.id));
    setIsDeleteDialogOpen(false);
    setSelectedDepartment(null);
    toast.success('学院已删除');
  };

  // 打开编辑对话框 - 支持多个管理员
  const openEditDialog = (department: Department) => {
    setSelectedDepartment(department);
    setEditingDepartment({ name: department.name, code: department.code, description: department.description, adminIds: [...department.adminIds], adminNames: [...department.adminNames] });
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
          admins={admins}
          onAddAdmin={handleAddAdmin}
          onRemoveAdmin={handleRemoveAdmin}
          onAddDepartment={handleAddDepartment}
        />

        {/* 编辑学院对话框 */}
        <DepartmentEditDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          editingDepartment={editingDepartment}
          setEditingDepartment={setEditingDepartment}
          admins={admins}
          onAddAdmin={handleEditAddAdmin}
          onRemoveAdmin={handleEditRemoveAdmin}
          onEditDepartment={handleEditDepartment}
        />
      </main>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default DepartmentManagementPage;