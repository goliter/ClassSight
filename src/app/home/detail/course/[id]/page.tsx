/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { BookOpen, Calendar, ChevronLeft, Clock, GraduationCap, MapPin, Building2, User, Users, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CourseDetailPageProps {
  params: { id: string };
}

// 学生接口定义
interface Student {
  id: string;
  name: string;
  studentId: string;
  departmentName: string;
  major: string;
  grade: string;
  class: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended' | 'graduated';
}

// 课程接口定义
interface CourseFromDb {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  teacherName: string;
  departmentName: string;
  status: 'active' | 'inactive' | 'pending';
  studentCount: number;
  schedule: Array<{
    day: string;
    time: string;
    location: string;
  }>;
}

// 课程详情页组件
const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const routeParams = useParams();
  const courseId = routeParams.id as string;
  
  const [courseData, setCourseData] = useState<CourseFromDb | null>(null);
  const [enrolledStudents, setEnrolledStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 从API获取课程数据
  const fetchCourseDataFromApi = async (id: string) => {
    try {
      const response = await fetch(`/api/course/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`获取课程信息失败: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('获取课程数据失败:', error);
      throw error;
    }
  };

  // 从API获取选修该课程的学生数据
  const fetchEnrolledStudentsFromApi = async (courseId: string) => {
    try {
      const response = await fetch(`/api/course/students/${courseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`获取学生信息失败: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('获取学生数据失败:', error);
      throw error;
    }
  };


  useEffect(() => {
    const fetchCourseData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // 并行获取课程数据和学生数据
        const [courseDataResult, studentsDataResult] = await Promise.all([
          fetchCourseDataFromApi(courseId),
          fetchEnrolledStudentsFromApi(courseId)
        ]);
        
        // 格式化课程数据
        const formattedCourse: CourseFromDb = {
          id: courseDataResult.data.id || '0',
          code: courseDataResult.data.code || '',
          name: courseDataResult.data.name || '未知课程',
          description: courseDataResult.data.description || '暂无描述',
          credits: typeof courseDataResult.data.credits === 'number' ? courseDataResult.data.credits : 0,
          teacherName: courseDataResult.data.teacherName || courseDataResult.data.teacher?.name || '未知教师',
          departmentName: courseDataResult.data.departmentName || courseDataResult.data.department?.name || '未知学院',
          status: courseDataResult.data.status || 'inactive',
          studentCount: typeof courseDataResult.data.studentCount === 'number' ? courseDataResult.data.studentCount : studentsDataResult.length,
          schedule: courseDataResult.data.schedule || []
        };
        
        setCourseData(formattedCourse);
        
        // 格式化学生数据
        const formattedStudents: Student[] = studentsDataResult.data.map((courseEnrollment: any) => {
          const student = courseEnrollment.student || courseEnrollment;
          return {
            id: student.id || student.studentId || '0',
            name: student.name || '未知学生',
            studentId: student.studentId || '未知学号',
            departmentName: student.departmentName || student.department?.name || '未知学院',
            major: student.major || student.major?.name || '未知专业',
            grade: student.grade || '未知年级',
            class: student.class || '未知班级',
            email: student.email || '',
            phone: student.phone || '',
            status: student.status || 'active'
          };
        });
        
        setEnrolledStudents(formattedStudents);
      } catch (err) {
        setError('获取课程信息失败，请稍后再试');
        console.error('获取课程数据失败:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  // 返回按钮处理函数
  const handleBack = () => {
    router.back();
  };

  // 获取状态徽章样式
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'graduated':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  // 获取状态文本
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '进行中';
      case 'inactive':
        return '已结束';
      case 'pending':
        return '未开始';
      case 'suspended':
        return '休学';
      case 'graduated':
        return '毕业';
      default:
        return status;
    }
  };

  // 加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">加载课程信息中...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 max-w-md w-full text-center">
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <div className="mb-6">
          <button 
            onClick={handleBack} 
            className="inline-flex items-center px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 dark:text-gray-300"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            返回
          </button>
        </div>

        {courseData && (
          <>
            {/* 课程信息卡片 */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center p-8">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md mb-4 md:mb-0 md:mr-6">
                    <BookOpen className="h-12 w-12 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="text-white flex-1">
                    <h1 className="text-3xl font-bold mb-2">{courseData.name}</h1>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="inline-flex items-center bg-white/20 rounded-full px-3 py-1 text-sm backdrop-blur-sm">
                        <span className="font-medium">课程代码：</span>
                        {courseData.code}
                      </div>
                      <div className="inline-flex items-center bg-white/20 rounded-full px-3 py-1 text-sm backdrop-blur-sm">
                        <span className="font-medium">学分：</span>
                        {courseData.credits}
                      </div>
                      <div className="inline-flex items-center bg-white/20 rounded-full px-3 py-1 text-sm backdrop-blur-sm">
                        <span className="font-medium">学生人数：</span>
                        {courseData.studentCount}
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      <Badge className={`${getStatusBadge(courseData.status)} px-3 py-1 text-sm font-medium`}>
                        {getStatusText(courseData.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 详细信息卡片组 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* 基本信息卡片 */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-blue-500" />
                    课程简介
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {courseData.description}
                  </p>
                </div>
              </div>

              {/* 教师信息卡片 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-500" />
                    授课教师
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {courseData.teacherName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{courseData.teacherName}</div>
                      <div className="text-gray-500 dark:text-gray-400 flex items-center">
                        <Building2 className="h-4 w-4 mr-1" />
                        {courseData.departmentName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 课程安排卡片 */}
              <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                    课程安排
                  </h2>
                  <div className="space-y-4">
                    {courseData.schedule.map((item, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full w-10 h-10 flex items-center justify-center font-semibold mr-4">
                          {item.day}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">
                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              {item.time}
                            </div>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {item.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 选课学生列表 */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Users className="h-6 w-6 mr-2 text-blue-500" />
                  选课学生列表
                </h2>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">姓名</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">学号</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">学院</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">专业</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">年级班级</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">邮箱</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">电话</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrolledStudents.length > 0 ? (
                        enrolledStudents.map((student) => (
                          <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <td className="py-4 px-6 text-sm font-medium flex items-center">
                              <User className="h-4 w-4 mr-2 text-blue-500" />
                              {student.name}
                            </td>
                            <td className="py-4 px-6 text-sm">{student.studentId}</td>
                            <td className="py-4 px-6 text-sm">
                              <div className="flex items-center">
                                <Building2 className="h-4 w-4 mr-2 text-purple-500" />
                                {student.departmentName}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-sm">{student.major}</td>
                            <td className="py-4 px-6 text-sm">
                              <div className="flex items-center">
                                <GraduationCap className="h-4 w-4 mr-2 text-green-500" />
                                {student.grade}级{student.class}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-sm">
                              <a href={`mailto:${student.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                {student.email}
                              </a>
                            </td>
                            <td className="py-4 px-6 text-sm">{student.phone}</td>
                            <td className="py-4 px-6 text-sm">
                              <Badge className={`${getStatusBadge(student.status)}`}>
                                {getStatusText(student.status)}
                              </Badge>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="py-8 px-6 text-center text-gray-500 dark:text-gray-400">
                            暂无学生选修此课程
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 页脚 */}
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-8">
          © 2024 ClassSight 课程管理系统
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;