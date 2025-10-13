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
import CourseAddDialog from "@/components/CourseAddDialog";
import CourseEditDialog from "@/components/CourseEditDialog";
import SearchBar from '@/components/SearchBar';
import DataTable from '@/components/DataTable';
import Pagination from '@/components/Pagination';

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

        {/* 使用搜索栏组件 */}
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          placeholder="搜索课程名称或代码..."
          onAddClick={() => setIsAddDialogOpen(true)}
          addButtonText="添加课程"
        />

        {/* 使用数据表格组件 */}
        <DataTable
          title="课程列表"
          data={paginatedCourses}
          columns={[
            { 
              header: '课程名称', 
              accessor: (course: Course) => (   
                <>
                  <div className="font-medium">{course.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                    {course.description}
                  </div>
                </>
              )
            },
            { header: '课程代码', accessor: 'code' },
            { header: '授课教师', accessor: 'teacherName' },
            { header: '所属学院', accessor: 'departmentName' },
            { header: '学分', accessor: 'credits' },
            { 
              header: '学生人数', 
              accessor: (course: Course) => (
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                >
                  {course.studentCount}
                </Badge>
              )
            },
            { header: '状态', accessor: 'status' }
          ]}
          onEdit={openEditDialog}
          onDelete={handleDeleteCourse}
          deleteDialogOpen={isDeleteDialogOpen}
          setDeleteDialogOpen={setIsDeleteDialogOpen}
          selectedItem={selectedCourse}
          setSelectedItem={setSelectedCourse}
          emptyStateText="没有找到符合条件的课程"
          getStatusBadge={getStatusBadge}
        />

        {/* 使用分页控件组件 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredCourses.length}
          itemsPerPage={itemsPerPage}
          onPageChange={goToPage}
        />
      </main>

      {/* 对话框部分保持不变 */}
      <CourseAddDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newCourse={newCourse}
        setNewCourse={setNewCourse}
        teachers={teachers}
        departments={departments}
        onAddCourse={handleAddCourse}
      />

      <CourseEditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        editingCourse={editingCourse}
        setEditingCourse={setEditingCourse}
        teachers={teachers}
        departments={departments}
        onEditCourse={handleEditCourse}
        selectedCourse={selectedCourse}
      />

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default CourseManagementPage;