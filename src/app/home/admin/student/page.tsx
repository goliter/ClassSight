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
import StudentAddDialog from '@/components/StudentAddDialog';
import StudentEditDialog from '@/components/StudentEditDialog';
import SearchBar from '@/components/SearchBar';
import DataTable from '@/components/DataTable';
import Pagination from '@/components/Pagination';

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

        {/* 使用搜索栏组件 */}
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          placeholder="搜索学生姓名或学号..."
          onAddClick={() => setIsAddDialogOpen(true)}
          addButtonText="添加学生"
        />

        {/* 使用数据表格组件 */}
        <DataTable
          title="学生列表"
          data={paginatedStudents}
          columns={[
            { header: '姓名', accessor: 'name', className: 'font-medium' },
            { header: '学号', accessor: 'studentId' },
            { header: '所属学院', accessor: 'departmentName' },
            { header: '专业', accessor: 'major' },
            { 
              header: '年级班级', 
              accessor: (student) => `${student.grade}级${student.class}`
            },
            { 
              header: '邮箱', 
              accessor: (student) => (
                <a
                  href={`mailto:${student.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {student.email}
                </a>
              )
            },
            { header: '电话', accessor: 'phone' },
            { header: '状态', accessor: 'status' }
          ]}
          onEdit={openEditDialog}
          onDelete={handleDeleteStudent}
          deleteDialogOpen={isDeleteDialogOpen}
          setDeleteDialogOpen={setIsDeleteDialogOpen}
          selectedItem={selectedStudent}
          setSelectedItem={setSelectedStudent}
          emptyStateText="没有找到符合条件的学生"
          getStatusBadge={getStatusBadge}
        />

        {/* 使用分页控件组件 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredStudents.length}
          itemsPerPage={itemsPerPage}
          onPageChange={goToPage}
        />
      </main>

      {/* 对话框部分保持不变 */}
      <StudentAddDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        departments={departments}
        onAddStudent={handleAddStudent}
      />

      <StudentEditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
        departments={departments}
        onEditStudent={handleEditStudent}
        selectedStudent={selectedStudent}
      />

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default StudentManagementPage;