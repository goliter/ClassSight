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
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { toast } from "sonner";
import { Badge } from '@/components/ui/badge';

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

const DepartmentManagementPage: React.FC = () => {
  // 模拟数据 - 更新为支持多个管理员
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: '1',
      name: '信息科学与技术学院',
      code: 'IST',
      description: '专注于计算机科学、软件工程和信息安全等领域的教学与研究',
      adminIds: ['AD10001', 'AD10002'],
      adminNames: ['张教授', '李教授'],
      studentCount: 1200,
      teacherCount: 85,
      courseCount: 120
    },
    {
      id: '2',
      name: '人工智能学院',
      code: 'AI',
      description: '培养人工智能领域的专业人才，研究机器学习、深度学习等前沿技术',
      adminIds: ['AD10003'],
      adminNames: ['王教授'],
      studentCount: 850,
      teacherCount: 62,
      courseCount: 95
    },
    {
      id: '3',
      name: '数学与统计学院',
      code: 'MAS',
      description: '提供数学、应用数学和统计学等专业的教育与研究',
      adminIds: [], // 支持没有管理员
      adminNames: [],
      studentCount: 680,
      teacherCount: 45,
      courseCount: 80
    },
  ]);

  // 模拟管理员数据
  const [admins] = useState<Admin[]>([
    { id: 'AD10001', name: '张教授', role: '系统管理员' },
    { id: 'AD10002', name: '李教授', role: '学院管理员' },
    { id: 'AD10003', name: '王教授', role: '学院管理员' },
    { id: 'AD10004', name: '赵教授', role: '学院管理员' },
  ]);

  // 状态管理 - 更新为支持多个管理员
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({
    name: '',
    code: '',
    description: '',
    adminIds: [],
    adminNames: []
  });
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

  // 处理添加学院 - 不再要求必须有管理员
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

  // 处理编辑学院 - 更新为支持多个管理员
  const handleEditDepartment = () => {
    if (!selectedDepartment || !editingDepartment.name || !editingDepartment.code) {
      toast.error('请填写学院名称和代码');
      return;
    }

    setDepartments(departments.map(dept => 
      dept.id === selectedDepartment.id
        ? {
            ...dept,
            name: editingDepartment.name || dept.name,
            code: editingDepartment.code || dept.code,
            description: editingDepartment.description || dept.description,
            adminIds: editingDepartment.adminIds || dept.adminIds,
            adminNames: editingDepartment.adminNames || dept.adminNames
          }
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

  // 打开编辑对话框 - 更新为支持多个管理员
  const openEditDialog = (department: Department) => {
    setSelectedDepartment(department);
    setEditingDepartment({
      name: department.name,
      code: department.code,
      description: department.description,
      adminIds: [...department.adminIds],
      adminNames: [...department.adminNames]
    });
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
          <p className="text-gray-500 dark:text-gray-400 mb-6">管理学院信息、学院管理员及相关数据</p>
        </div>

        {/* 搜索和添加按钮区域 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索学院名称或代码..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            添加学院
          </Button>
        </div>

        {/* 学院列表 */}
        <Card>
          <CardHeader>
            <CardTitle>学院列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 text-left font-semibold">学院名称</th>
                    <th className="py-3 text-left font-semibold">学院代码</th>
                    <th className="py-3 text-left font-semibold">学院管理员</th>
                    <th className="py-3 text-left font-semibold">学生人数</th>
                    <th className="py-3 text-left font-semibold">教师人数</th>
                    <th className="py-3 text-left font-semibold">课程数量</th>
                    <th className="py-3 text-left font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedDepartments.length > 0 ? (
                    paginatedDepartments.map((department) => (
                      <tr key={department.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-4">
                          <div className="font-medium">{department.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{department.description}</div>
                        </td>
                        <td className="py-4">{department.code}</td>
                        <td className="py-4">
                          {department.adminNames.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {department.adminNames.map((adminName, index) => (
                                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                  {adminName}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">暂无管理员</span>
                          )}
                        </td>
                        <td className="py-4">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                            {department.studentCount}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                            {department.teacherCount}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                            {department.courseCount}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(department)}
                              className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog open={isDeleteDialogOpen && selectedDepartment?.id === department.id} onOpenChange={setIsDeleteDialogOpen}>
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
                                    您确定要删除学院「{department.name}」吗？此操作无法撤销。
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>取消</AlertDialogCancel>
                                  <AlertDialogAction onClick={handleDeleteDepartment} className="bg-red-600 hover:bg-red-700">
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
                      <td colSpan={7} className="py-10 text-center text-gray-500 dark:text-gray-400">
                        没有找到符合条件的学院
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
              显示 {paginatedDepartments.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -
              {Math.min(currentPage * itemsPerPage, filteredDepartments.length)}，共 {filteredDepartments.length} 条记录
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

      {/* 添加学院对话框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>添加学院</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="departmentName" className="text-right font-medium">学院名称</label>
              <Input
                id="departmentName"
                placeholder="请输入学院名称"
                value={newDepartment.name || ''}
                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="departmentCode" className="text-right font-medium">学院代码</label>
              <Input
                id="departmentCode"
                placeholder="请输入学院代码"
                value={newDepartment.code || ''}
                onChange={(e) => setNewDepartment({ ...newDepartment, code: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="departmentDescription" className="text-right font-medium">学院描述</label>
              <Input
                id="departmentDescription"
                placeholder="请输入学院描述"
                value={newDepartment.description || ''}
                onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="departmentAdmins" className="text-right font-medium">学院管理员</label>
              <div className="col-span-3 space-y-2">
                <Select
                  onValueChange={handleAddAdmin}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="添加学院管理员" />
                  </SelectTrigger>
                  <SelectContent>
                    {admins.filter(admin => !newDepartment.adminIds?.includes(admin.id)).map((admin) => (
                      <SelectItem key={admin.id} value={admin.id}>
                        {admin.name} ({admin.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* 已选择的管理员列表 */}
                {newDepartment.adminNames && newDepartment.adminNames.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newDepartment.adminNames.map((adminName, index) => {
                      const adminId = newDepartment.adminIds ? newDepartment.adminIds[index] : '';
                      return (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {adminName}
                          <button
                            onClick={() => handleRemoveAdmin(adminId)}
                            className="ml-1 p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>取消</Button>
            <Button onClick={handleAddDepartment}>添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑学院对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>编辑学院</DialogTitle>
          </DialogHeader>
          {selectedDepartment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="editDepartmentName" className="text-right font-medium">学院名称</label>
                <Input
                  id="editDepartmentName"
                  placeholder="请输入学院名称"
                  value={editingDepartment.name || ''}
                  onChange={(e) => setEditingDepartment({ ...editingDepartment, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="editDepartmentCode" className="text-right font-medium">学院代码</label>
                <Input
                  id="editDepartmentCode"
                  placeholder="请输入学院代码"
                  value={editingDepartment.code || ''}
                  onChange={(e) => setEditingDepartment({ ...editingDepartment, code: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="editDepartmentDescription" className="text-right font-medium">学院描述</label>
                <Input
                  id="editDepartmentDescription"
                  placeholder="请输入学院描述"
                  value={editingDepartment.description || ''}
                  onChange={(e) => setEditingDepartment({ ...editingDepartment, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="editDepartmentAdmins" className="text-right font-medium">学院管理员</label>
                <div className="col-span-3 space-y-2">
                  <Select
                    onValueChange={handleEditAddAdmin}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="添加学院管理员" />
                    </SelectTrigger>
                    <SelectContent>
                      {admins.filter(admin => !editingDepartment.adminIds?.includes(admin.id)).map((admin) => (
                        <SelectItem key={admin.id} value={admin.id}>
                          {admin.name} ({admin.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* 已选择的管理员列表 */}
                  {editingDepartment.adminNames && editingDepartment.adminNames.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {editingDepartment.adminNames.map((adminName, index) => {
                        const adminId = editingDepartment.adminIds ? editingDepartment.adminIds[index] : '';
                        return (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {adminName}
                            <button
                              onClick={() => handleEditRemoveAdmin(adminId)}
                              className="ml-1 p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)}>取消</Button>
            <Button onClick={handleEditDepartment}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default DepartmentManagementPage;