/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, BookOpen, Building2, GraduationCap, Calendar, Clock, Award, ChevronLeft } from "lucide-react";
import CourseList from "@/components/CourseList";

interface StudentDetailPageProps {
  params: { id: string };
}

// 学生接口定义
interface Student {
  id: string;
  name: string;
  studentId: string;
  departmentId: string;
  departmentName?: string;
  major: string;
  grade: string;
  class: string;
  email: string;
  phone: string;
  enrollmentDate: string;
  status: 'active' | 'suspended' | 'graduated';
  courseCount: number;
}

// 课程接口定义
interface Course {
  id: string;
  name: string;
  teacher: string;
  department: string;
  type: string;
  schedule: string;
  bgColor: string;
}

const StudentDetailPage: React.FC<StudentDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const studentId = params.id;
  
  // 使用useState管理学生数据状态
  const [studentData, setStudentData] = useState<Student>({
    id: studentId,
    name: '未知学生',
    studentId: '未知',
    departmentId: '',
    departmentName: '未知',
    major: '未知',
    grade: '未知',
    class: '未知',
    email: '',
    phone: '',
    enrollmentDate: '未知',
    status: 'active',
    courseCount: 0
  });
  
  // 使用useState管理课程数据状态
  const [studentCourses, setStudentCourses] = useState<Course[]>([]);
  
  // 使用useEffect获取学生数据
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`/api/student/${studentId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`获取学生信息失败: ${response.status}`);
        }
        
        const student = await response.json();
        
        // 检查是否获取到学生数据
        if (!student) {
          throw new Error('未找到学生信息');
        }
        
        // 将API返回的数据映射到Student接口并更新状态
        const mappedStudentData: Student = {
          id: student.data.studentId || studentId,
          name: student.data.name || '未知',
          studentId: student.data.studentId || '未知',
          departmentId: student.data.departmentId || '',
          departmentName: student.data.department?.name || '未知',
          major: student.data.major || '未知',
          grade: student.data.grade || '未知',
          class: student.data.class || '未知',
          email: student.data.email || '',
          phone: student.data.phone || '',
          enrollmentDate: student.data.enrollmentDate ? new Date(student.data.enrollmentDate).toLocaleDateString() : '未知',
          status: (student.data.status as 'active' | 'suspended' | 'graduated') || 'active',
          courseCount: student.data.courseCount || 0
        };
        
        setStudentData(mappedStudentData);
      } catch (error) {
        console.error('获取学生信息失败:', error);
        // 错误情况下保持默认数据
      }
    };
    
    // 获取学生课程数据
    const fetchStudentCourses = async () => {
      try {
        const response = await fetch(`/api/course/student/${studentId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`获取课程信息失败: ${response.status}`);
        }
        
        const coursesData = await response.json();
        
        // 将API返回的数据映射到Course接口
        const mappedCourses: Course[] = coursesData.data.map((courseEnrollment: any) => {
          const course = courseEnrollment.course;
          // 为不同课程类型设置不同的背景颜色
          const bgColorMap: Record<string, string> = {
            '必修课': 'bg-blue-500 dark:bg-blue-700',
            '选修课': 'bg-green-500 dark:bg-green-700',
            '通识课': 'bg-purple-500 dark:bg-purple-700',
            '实践课': 'bg-amber-500 dark:bg-amber-700'
          };
          
          return {
            id: course.id,
            name: course.name || '未知课程',
            teacher: course.teacherName || '未知教师',
            department: course.departmentName || '未知院系',
            type: course.type || '未知类型',
            schedule: course.schedule || '未知时间',
            bgColor: bgColorMap[course.type] || 'bg-gray-500 dark:bg-gray-700'
          };
        });
        
        setStudentCourses(mappedCourses);
      } catch (error) {
        console.error('获取课程信息失败:', error);
        // 错误情况下保持空数组
        setStudentCourses([]);
      }
    };
    
    // 并行获取学生信息和课程数据
    Promise.all([
      fetchStudentData(),
      fetchStudentCourses()
    ]);
  }, [studentId]);
  

  const handleBack = () => {
    router.back();
  };

  // 获取状态对应的文本和样式
  const getStatusInfo = (status: string) => {
    const statusMap = {
      active: { text: '在读', bgColor: 'bg-green-100 dark:bg-green-900/30', textColor: 'text-green-800 dark:text-green-300' },
      suspended: { text: '休学', bgColor: 'bg-amber-100 dark:bg-amber-900/30', textColor: 'text-amber-800 dark:text-amber-300' },
      graduated: { text: '毕业', bgColor: 'bg-blue-100 dark:bg-blue-900/30', textColor: 'text-blue-800 dark:text-blue-300' }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.active;
  };

  const statusInfo = getStatusInfo(studentData.status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 返回按钮 */}
        <button
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 transition-colors"
          onClick={handleBack}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="font-medium">返回列表</span>
        </button>

        {/* 学生信息卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl">
          {/* 学生基本信息 */}
          <div className="px-6 pb-6 mt-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* 头像 */}
              <div className="w-32 h-32 bg-white dark:bg-gray-700 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                <User className="h-16 w-16 text-gray-400 dark:text-gray-500" />
              </div>
              
              {/* 姓名和状态 */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{studentData.name}</h1>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                    {statusInfo.text}
                  </span>
                </div>
                <p className="text-lg text-gray-500 dark:text-gray-400">学号：{studentData.studentId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 详细信息卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 基本信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              基本信息
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">姓名</div>
                <div className="col-span-2 font-medium">{studentData.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">学号</div>
                <div className="col-span-2 font-medium">{studentData.studentId}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">邮箱</div>
                <div className="col-span-2 font-medium flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-500" />
                  {studentData.email}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">电话</div>
                <div className="col-span-2 font-medium flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-blue-500" />
                  {studentData.phone}
                </div>
              </div>
            </div>
          </div>

          {/* 学籍信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-purple-500" />
              学籍信息
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">学院</div>
                <div className="col-span-2 font-medium flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-purple-500" />
                  {studentData.departmentName}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">专业</div>
                <div className="col-span-2 font-medium">{studentData.major}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">年级</div>
                <div className="col-span-2 font-medium">{studentData.grade}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">班级</div>
                <div className="col-span-2 font-medium">{studentData.class}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 其他信息卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-green-500" />
            其他信息
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-500 mb-2" />
              <div className="text-sm text-gray-500 dark:text-gray-400">入学日期</div>
              <div className="font-medium mt-1">{studentData.enrollmentDate}</div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Award className="h-6 w-6 text-purple-500 mb-2" />
              <div className="text-sm text-gray-500 dark:text-gray-400">当前状态</div>
              <div className={`font-medium mt-1 ${statusInfo.textColor}`}>{statusInfo.text}</div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Clock className="h-6 w-6 text-green-500 mb-2" />
              <div className="text-sm text-gray-500 dark:text-gray-400">当前课程</div>
              <div className="font-medium mt-1">{studentData.courseCount}门</div>
            </div>
          </div>
        </div>

        {/* 课程列表展示 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-blue-500" />
              正在修读的课程
            </h2>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <CourseList 
              courses={studentCourses}
              isStudentView={true} // 设置为学生视图，即为只读模式
            />
          </div>
        </div>

        {/* 页脚 */}
        <div className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} 学生信息管理系统</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;