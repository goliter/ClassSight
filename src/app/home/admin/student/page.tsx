/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import StudentNavigation from '@/components/StudentNavigation';
import { toast } from "sonner";
import { Badge } from '@/components/ui/badge';
import StudentAddDialog from '@/components/StudentAddDialog';
import StudentEditDialog from '@/components/StudentEditDialog';
import SearchBar from '@/components/SearchBar';
import DataTable from '@/components/DataTable';
import Pagination from '@/components/Pagination';

// 学生接口定义
interface Student {
  name: string;
  studentId: string;
  departmentId: string;
  departmentName: string;
  major: string;
  grade: string;
  class: string;
  email: string;
  phone: string;
  password: string;
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
  // 状态管理
  const [students, setStudents] = useState<Student[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    grade: '2025',
    class: '',
    email: '',
    phone: '',
    password: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    status: 'active'
  });
  const [editingStudent, setEditingStudent] = useState<Partial<Student>>({});
  const itemsPerPage = 10;

  // 从API获取学生数据
  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/student', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('获取学生数据失败');
      }
      
      const result = await response.json();
      console.log('学生API返回数据:', result);
      
      // 直接检查result是否为数组，如果是则使用，否则检查是否有data字段
      const studentsArray = Array.isArray(result) ? result : (result && Array.isArray(result.data) ? result.data : []);
      
      // 确保每个学生对象都有departmentName属性
      const studentsWithDepartmentName = studentsArray.map((student: any) => ({
        ...student,
        departmentName: student.departmentName || (student.department && student.department.name) || '未知学院'
      }));
      
      setStudents(studentsWithDepartmentName);
    } catch (err) {
      console.error('获取学生数据时出错:', err);
      toast.error('获取学生数据失败，请稍后重试');
      // 出错时设置为空数组
      setStudents([]);
    }
  };

  // 从API获取部门数据
  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/department', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('获取部门数据失败');
      }
      
      const result = await response.json();
      console.log('部门API返回数据:', result);
      
      // 根据用户提供的格式，从result.data字段获取部门数组
      const departmentsArray = result && Array.isArray(result.data) ? result.data : [];
      setDepartments(departmentsArray);
    } catch (err) {
      console.error('获取部门数据时出错:', err);
      toast.error('获取部门数据失败，请稍后重试');
      // 出错时设置为空数组
      setDepartments([]);
    }
  };

  // 组件加载时获取数据
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 分别处理每个请求，确保即使一个失败另一个也能继续
        await fetchStudents();
        await fetchDepartments();
      } catch (err) {
        setError('数据加载失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 过滤数据
  const filteredStudents = students.filter(student => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    // 确保所有字段在调用方法前都经过存在性和类型检查
    return (typeof student.name === 'string' && student.name.toLowerCase().includes(lowerSearchTerm)) ||
           (typeof student.studentId === 'string' && student.studentId.includes(searchTerm)) ||
           (typeof student.departmentName === 'string' && student.departmentName.toLowerCase().includes(lowerSearchTerm)) ||
           (typeof student.major === 'string' && student.major.toLowerCase().includes(lowerSearchTerm));
  });

  // 分页
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 处理添加学生
  const handleAddStudent = async () => {
    if (!newStudent.name || !newStudent.studentId || !newStudent.departmentId || !newStudent.major || !newStudent.password) {
      toast.error('请填写学生姓名、学号、所属学院、专业和密码');
      return;
    }

    // 检查学号是否已存在
    const isStudentIdExists = students.some(student => student.studentId === newStudent.studentId);
    if (isStudentIdExists) {
      toast.error('该学号已存在，请使用其他学号');
      return;
    }

    const department = departments.find(d => d.id === newStudent.departmentId);
    if (!department) {
      toast.error('请选择有效的学院');
      return;
    }

    try {
      const response = await fetch('/api/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newStudent.name,
          studentId: newStudent.studentId,
          departmentId: newStudent.departmentId,
          major: newStudent.major,
          grade: newStudent.grade || '2025',
          class: newStudent.class || '',
          email: newStudent.email || '',
          phone: newStudent.phone || '',
          password: newStudent.password,
          enrollmentDate: newStudent.enrollmentDate ? `${newStudent.enrollmentDate}T00:00:00.000Z` : new Date().toISOString(),
          status: newStudent.status as 'active' | 'suspended' | 'graduated' || 'active'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || '添加学生失败');
      }

      const result = await response.json();
      console.log('添加学生API返回:', result);
      
      // 从result.data字段提取创建的学生数据
      const createdStudent = result && result.data ? result.data : {};
      // 添加departmentName到返回的数据中
      createdStudent.departmentName = department.name;
      
      setStudents([...students, createdStudent]);
      setIsAddDialogOpen(false);
      setNewStudent({
        name: '',
        studentId: '',
        departmentId: '',
        major: '',
        grade: '2025',
        class: '',
        email: '',
        phone: '',
        password: '',
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'active'
      });
      toast.success('学生信息添加成功');
    } catch (err: any) {
      console.error('添加学生时出错:', err);
      // 特别处理学号重复的错误
      const errorMessage = err.message || '';
      if (errorMessage.includes('Unique constraint failed') || 
          errorMessage.includes('studentId') || 
          errorMessage.includes('重复')) {
        toast.error('该学号已存在，请使用其他学号');
      } else {
        toast.error(errorMessage || '添加学生失败，请稍后重试');
      }
    }
  };

  // 处理编辑学生
  const handleEditStudent = async () => {
    if (!selectedStudent || !editingStudent.name || !editingStudent.studentId || !editingStudent.departmentId || !editingStudent.major) {
      toast.error('请填写学生姓名、学号、所属学院和专业');
      return;
    }

    const department = departments.find(d => d.id === editingStudent.departmentId);
    if (!department) {
      toast.error('请选择有效的学院');
      return;
    }

    try {
      const response = await fetch(`/api/student/${selectedStudent.studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingStudent.name,
          studentId: editingStudent.studentId,
          departmentId: editingStudent.departmentId,
          major: editingStudent.major,
          grade: editingStudent.grade || selectedStudent.grade,
          class: editingStudent.class || selectedStudent.class,
          email: editingStudent.email || selectedStudent.email,
          phone: editingStudent.phone || selectedStudent.phone,
          enrollmentDate: editingStudent.enrollmentDate ? 
            // 确保处理日期格式，避免重复添加时间部分
            (editingStudent.enrollmentDate.includes('T') ? 
              editingStudent.enrollmentDate : 
              `${editingStudent.enrollmentDate}T00:00:00.000Z`
            ) : 
            // 确保使用selectedStudent中的日期前先规范化格式
            (selectedStudent.enrollmentDate && selectedStudent.enrollmentDate.includes('T00:00:00.000ZT00:00:00.000Z') ? 
              selectedStudent.enrollmentDate.split('T00:00:00.000Z')[0] + 'T00:00:00.000Z' : 
              selectedStudent.enrollmentDate
            ),
          status: editingStudent.status as 'active' | 'suspended' | 'graduated' || selectedStudent.status
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '更新学生信息失败');
      }

      const result = await response.json();
      console.log('更新学生API返回:', result);
      
      // 从result.data字段提取更新后的学生数据
      const updatedStudent = result && result.data ? result.data : {};
      // 更新departmentName
      updatedStudent.departmentName = department.name;
      
      setStudents(students.map(student => 
        student.studentId === selectedStudent.studentId ? updatedStudent : student
      ));

      setIsEditDialogOpen(false);
      setSelectedStudent(null);
      setEditingStudent({});
      toast.success('学生信息已更新');
    } catch (err: any) {
      console.error('更新学生信息时出错:', err);
      toast.error(err.message || '更新学生信息失败，请稍后重试');
    }
  };

  // 处理删除学生
  const handleDeleteStudent = async () => {
    if (!selectedStudent) return;

    try {
      const response = await fetch(`/api/student/${selectedStudent.studentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '删除学生信息失败');
      }

      setStudents(students.filter(student => student.studentId !== selectedStudent.studentId));
      setIsDeleteDialogOpen(false);
      setSelectedStudent(null);
      toast.success('学生信息已删除');
    } catch (err: any) {
      console.error('删除学生信息时出错:', err);
      toast.error(err.message || '删除学生信息失败，请稍后重试');
    }
  };

  // 打开编辑对话框
  const openEditDialog = (student: Student) => {
    setSelectedStudent(student);
    // 规范化日期格式，确保不含时间部分
    const normalizedEnrollmentDate = student.enrollmentDate.includes('T') 
      ? student.enrollmentDate.split('T')[0] 
      : student.enrollmentDate;
    setEditingStudent({
      name: student.name,
      studentId: student.studentId,
      departmentId: student.departmentId,
      major: student.major,
      grade: student.grade,
      class: student.class,
      email: student.email,
      phone: student.phone,
      enrollmentDate: normalizedEnrollmentDate,
      status: student.status
    });
    setIsEditDialogOpen(true);
  };

  // 打开删除对话框
  const openDeleteStudentDialog = (student: Student) => {
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

  // 加载状态显示
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
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
          
          <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6 min-h-[300px] flex items-center justify-center">
            <div className="text-xl font-medium">加载中...</div>
          </div>
        </main>
        
        {/* 页脚 */}
        <PageFooter />
      </div>
    );
  }

  // 错误状态显示
  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
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
          
          <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6 min-h-[300px] flex flex-col items-center justify-center">
            <div className="text-red-500 text-xl font-medium mb-4">{error}</div>
            <button 
              onClick={() => {
                setError(null);
                Promise.all([fetchStudents(), fetchDepartments()]);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              重新加载
            </button>
          </div>
        </main>
        
        {/* 页脚 */}
        <PageFooter />
      </div>
    );
  }

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
        {/* 为每个学生添加id属性，确保DataTable可以正确识别唯一标识 */}
        <DataTable
          title="学生列表"
          data={paginatedStudents.map(student => ({ ...student, id: student.studentId }))}
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
          onEdit={(student) => openEditDialog(student)}
          onDelete={(student) => openDeleteStudentDialog(student)}
          deleteDialogOpen={isDeleteDialogOpen}
          setDeleteDialogOpen={setIsDeleteDialogOpen}
          selectedItem={selectedStudent}
          setSelectedItem={setSelectedStudent}
          emptyStateText="没有找到符合条件的学生"
          getStatusBadge={getStatusBadge}
        />
        
        {/* 确认删除对话框 - 直接在页面中实现，不依赖DataTable组件 */}
        {isDeleteDialogOpen && selectedStudent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium mb-4">确认删除</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                您确定要删除学生「{selectedStudent.name}」吗？此操作无法撤销。
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  取消
                </button>
                <button
                  onClick={handleDeleteStudent}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 使用分页控件组件 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredStudents.length}
          itemsPerPage={itemsPerPage}
          onPageChange={goToPage}
        />
      </main>

      {/* 对话框部分 - 确保传入有效的部门数组 */}
      <StudentAddDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        departments={Array.isArray(departments) ? departments : []}
        onAddStudent={handleAddStudent}
      />

      <StudentEditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
        departments={Array.isArray(departments) ? departments : []}
        onEditStudent={handleEditStudent}
        selectedStudent={selectedStudent}
      />

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default StudentManagementPage;