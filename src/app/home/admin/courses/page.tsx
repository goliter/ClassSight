/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import StudentNavigation from '@/components/StudentNavigation';
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

// 教师接口定义 - 与数据库模型保持一致，主键为teacherId
interface Teacher {
  teacherId: string;
  name: string;
}

// 部门接口定义
interface Department {
  id: string;
  name: string;
}

const CourseManagementPage: React.FC = () => {
  // 状态管理
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
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

  // 从API获取所有课程
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/course');
      const data = await response.json();
      
      if (response.ok) {
        // 确保每个课程对象都包含必需的字段，并从嵌套对象中提取teacherName和departmentName
        const coursesWithDefaults = data.data.map((course: any) => ({
          ...course,
          // 从嵌套的teacher对象中提取teacherName
          teacherName: course.teacher?.name || '',
          // 从嵌套的department对象中提取departmentName或使用teacher.departmentName
          departmentName: course.department?.name || course.teacher?.departmentName || '',
          studentCount: course.studentCount || 0
        }));
        setCourses(coursesWithDefaults);
      } else {
        toast.error(data.error || '获取课程列表失败');
      }
    } catch (error) {
      console.error('获取课程列表错误:', error);
      toast.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 从API获取所有教师
  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/teacher');
      const data = await response.json();
      
      if (response.ok && Array.isArray(data.data)) {
        setTeachers(data.data);
      } else {
        toast.error(data.error || '获取教师列表失败');
        // 确保teachers是数组，即使API返回错误
        setTeachers([]);
      }
    } catch (error) {
      console.error('获取教师列表错误:', error);
      toast.error('网络错误，请稍后重试');
      // 确保teachers是数组，即使发生异常
      setTeachers([]);
    }
  };

  // 从API获取所有部门
  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/department');
      const data = await response.json();
      
      if (response.ok && Array.isArray(data.data)) {
        setDepartments(data.data);
      } else {
        toast.error(data.error || '获取部门列表失败');
        // 确保departments是数组，即使API返回错误
        setDepartments([]);
      }
    } catch (error) {
      console.error('获取部门列表错误:', error);
      toast.error('网络错误，请稍后重试');
      // 确保departments是数组，即使发生异常
      setDepartments([]);
    }
  };

  // 初始化时获取数据
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchCourses(), fetchTeachers(), fetchDepartments()]);
    };
    
    loadData();
  }, []);

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 过滤数据
  const filteredCourses = courses.filter(course => {
    // 提前转换搜索词为小写，避免重复转换
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    // 检查每个字段是否存在且为字符串类型，然后进行搜索
    return (
      (typeof course.name === 'string' && course.name.toLowerCase().includes(lowerSearchTerm)) ||
      (typeof course.code === 'string' && course.code.toLowerCase().includes(lowerSearchTerm)) ||
      (typeof course.teacherName === 'string' && course.teacherName.toLowerCase().includes(lowerSearchTerm)) ||
      (typeof course.departmentName === 'string' && course.departmentName.toLowerCase().includes(lowerSearchTerm))
    );
  });

  // 分页
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 处理添加课程
  const handleAddCourse = async () => {
    if (!newCourse.name || !newCourse.code || !newCourse.teacherId || !newCourse.departmentId) {
      toast.error('请填写课程名称、代码、教师和部门');
      return;
    }

    // 使用字符串比较确保类型一致性，根据Teacher接口定义使用teacherId字段
    const teacher = teachers.find(t => String(t.teacherId) === String(newCourse.teacherId));
    const department = departments.find(d => String(d.id) === String(newCourse.departmentId));

    if (!teacher || !department) {
      toast.error('请选择有效的教师和部门');
      return;
    }

    try {
      const response = await fetch('/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCourse.name,
          code: newCourse.code,
          credits: newCourse.credits,
          status: newCourse.status,
          description: newCourse.description,
          // 直接使用外键ID字段，符合Prisma schema定义
          teacherId: newCourse.teacherId,
          departmentId: newCourse.departmentId
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
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
        // 重新获取课程列表
        await fetchCourses();
      } else {
        toast.error(data.error || '创建课程失败');
      }
    } catch (error) {
      console.error('添加课程错误:', error);
      toast.error('网络错误，请稍后重试');
    }
  };

  // 处理编辑课程
  const handleEditCourse = async () => {
    if (!selectedCourse || !editingCourse.name || !editingCourse.code || !editingCourse.teacherId || !editingCourse.departmentId) {
      toast.error('请填写课程名称、代码、教师和部门');
      return;
    }

    // 使用字符串比较确保类型一致性，根据Teacher接口定义使用teacherId字段
    const teacher = teachers.find(t => String(t.teacherId) === String(editingCourse.teacherId));
    const department = departments.find(d => String(d.id) === String(editingCourse.departmentId));

    if (!teacher || !department) {
      toast.error('请选择有效的教师和部门');
      return;
    }

    try {
      const response = await fetch(`/api/course/${selectedCourse.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingCourse.name,
          code: editingCourse.code,
          credits: editingCourse.credits,
          status: editingCourse.status,
          description: editingCourse.description,
          // 直接使用外键ID字段，符合Prisma schema定义
          teacherId: editingCourse.teacherId,
          departmentId: editingCourse.departmentId
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsEditDialogOpen(false);
        setSelectedCourse(null);
        setEditingCourse({});
        toast.success('课程信息已更新');
        // 重新获取课程列表
        await fetchCourses();
      } else {
        toast.error(data.error || '更新课程信息失败');
      }
    } catch (error) {
      console.error('编辑课程错误:', error);
      toast.error('网络错误，请稍后重试');
    }
  };

  // 处理删除课程
  const handleDeleteCourse = async (course: Course) => {
    try {
      const response = await fetch(`/api/course/${course.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsDeleteDialogOpen(false);
        setSelectedCourse(null);
        toast.success('课程已删除');
        // 重新获取课程列表
        await fetchCourses();
      } else {
        toast.error(data.error || '删除课程失败');
        // 删除失败时也关闭对话框
        setIsDeleteDialogOpen(false);
        setSelectedCourse(null);
      }
    } catch (error) {
      console.error('删除课程错误:', error);
      toast.error('网络错误，请稍后重试');
      // 出错时也关闭对话框
      setIsDeleteDialogOpen(false);
      setSelectedCourse(null);
    }
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

        {/* 加载状态 */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-gray-500">加载中...</div>
          </div>
        ) : (
          <>
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
            
            {/* 空状态 */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">暂无课程数据</p>
              </div>
            )}
          </>
        )}

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