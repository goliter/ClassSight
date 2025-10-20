/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Building2,
  Calendar,
  Clock,
  Award,
  ChevronLeft,
  Briefcase,
  MapPin,
} from "lucide-react";
import CourseList from "@/components/CourseList";

interface TeacherDetailPageProps {
  params: { id: string };
}

// 简化的教师接口定义 - 只包含页面实际使用的字段
interface Teacher {
  teacherId: string;
  name: string;
  departmentId: string;
  rank: string;
  email: string;
  phone: string | null;
  office: string | null;
  hireDate: Date;
  status: "active" | "onLeave" | "resigned";
  department: string;
  courses?: CourseFromDb[];
}

// 数据库中的课程结构（仅用于数据映射）
interface CourseFromDb {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  type: string;
  credits: number;
  description: string | null;
  schedule: any | null;
  status: string;
  studentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// 页面展示用的课程接口 - 调整为与CourseList组件完全匹配的结构
interface Course {
  id: string;
  name: string;
  teacher: string;
  department: string;
  type: string;
  schedule: string;
  bgColor: string;
}

const TeacherDetailPage: React.FC<TeacherDetailPageProps> = ({ params }) => {
  const router = useRouter();

  const routeParams = useParams();
  const teacherId = routeParams.id as string;
  const [teacherData, setTeacherData] = useState<Teacher | null>(null);
  const [teacherCourses, setTeacherCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 从API获取教师数据
  const fetchTeacherDataFromApi = async (id: string) => {
    try {
      const response = await fetch(`/api/teacher/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`获取教师信息失败: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('获取教师数据失败:', error);
      throw error;
    }
  };

  // 从API获取教师课程数据
  const fetchTeacherCoursesFromApi = async (id: string) => {
    try {
      const response = await fetch(`/api/course/teacher/${id}`, {
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

  // 使用API获取教师数据和课程信息
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        setLoading(true);
        
        // 并行获取教师数据和课程数据
        const [teacherDataResult, coursesDataResult] = await Promise.all([
          fetchTeacherDataFromApi(teacherId),
          fetchTeacherCoursesFromApi(teacherId)
        ]);
        
        if (teacherDataResult) {
          // 格式化教师数据以匹配页面需要的结构
          setTeacherData({
            teacherId: teacherDataResult.data.teacherId || teacherId,
            name: teacherDataResult.data.name || "未命名教师",
            departmentId: teacherDataResult.data.departmentId || "",
            rank: teacherDataResult.data.rank || "",
            email: teacherDataResult.data.email || "",
            phone: teacherDataResult.data.phone || "",
            office: teacherDataResult.data.office || "",
            hireDate: teacherDataResult.data.hireDate ? new Date(teacherDataResult.data.hireDate) : new Date(),
            status: (teacherDataResult.data.status as "active" | "onLeave" | "resigned") || "active",
            department: teacherDataResult.data.departmentName || "",
            courses: coursesDataResult
          });

          // 重新格式化课程数据，确保与CourseList组件的Course接口完全匹配
          const formattedCourses: Course[] = [];
          if (coursesDataResult && coursesDataResult.length > 0) {
            formattedCourses.push(...coursesDataResult.map((course: any) => ({
              id: course.data.id || `course-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              name: course.data.name || "未命名课程",
              teacher: teacherDataResult.name,
              department: teacherDataResult.department?.name || course.data.departmentName || "",
              type: course.data.type || "专业课程",
              schedule: formatSchedule(course.data.schedule),
              bgColor: getRandomColor(),
            })));
          }
          setTeacherCourses(formattedCourses);
        }
      } catch (error) {
        console.error("获取教师数据失败:", error);
        setTeacherCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [teacherId]);

  // 生成随机背景色
  const getRandomColor = () => {
    const colors = [
      "bg-blue-500 dark:bg-blue-700",
      "bg-green-500 dark:bg-green-700",
      "bg-purple-500 dark:bg-purple-700",
      "bg-amber-500 dark:bg-amber-700",
      "bg-pink-500 dark:bg-pink-700",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // 格式化日期显示
  const formatDate = (date: Date): string => {
    if (!date || !(date instanceof Date)) {
      return "未知";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleBack = () => {
    router.back();
  };

  // 获取状态对应的文本和样式
  const getStatusInfo = (status: string) => {
    const statusMap = {
      active: {
        text: "在职",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        textColor: "text-green-800 dark:text-green-300",
      },
      onLeave: {
        text: "休假",
        bgColor: "bg-amber-100 dark:bg-amber-900/30",
        textColor: "text-amber-800 dark:text-amber-300",
      },
      resigned: {
        text: "离职",
        bgColor: "bg-gray-100 dark:bg-gray-700/30",
        textColor: "text-gray-800 dark:text-gray-300",
      },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.active;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-gray-900 dark:text-gray-100 text-lg">
          加载中...
        </div>
      </div>
    );
  }

  if (!teacherData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-gray-900 dark:text-gray-100 text-lg">
          未找到该教师信息
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(teacherData.status);
  const formattedHireDate = formatDate(teacherData.hireDate);
  const courseCount = teacherData.courses?.length || 0;

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

        {/* 教师信息卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl">
          {/* 教师基本信息 */}
          <div className="px-6 pb-6 mt-0">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* 头像 */}
              <div className="w-32 h-32 bg-white dark:bg-gray-700 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                <User className="h-16 w-16 text-gray-400 dark:text-gray-500" />
              </div>

              {/* 姓名和状态 */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {teacherData.name}
                  </h1>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}
                  >
                    {statusInfo.text}
                  </span>
                </div>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  工号：{teacherData.teacherId}
                </p>
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
                <div className="col-span-1 text-gray-500 dark:text-gray-400">
                  姓名
                </div>
                <div className="col-span-2 font-medium">{teacherData.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">
                  工号
                </div>
                <div className="col-span-2 font-medium">
                  {teacherData.teacherId}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">
                  邮箱
                </div>
                <div className="col-span-2 font-medium flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-500" />
                  {teacherData.email}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">
                  电话
                </div>
                <div className="col-span-2 font-medium flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-blue-500" />
                  {teacherData.phone || "暂无"}
                </div>
              </div>
            </div>
          </div>

          {/* 工作信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-purple-500" />
              工作信息
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">
                  学院
                </div>
                <div className="col-span-2 font-medium flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-purple-500" />
                  {teacherData.department || "暂无"}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">
                  职称
                </div>
                <div className="col-span-2 font-medium">{teacherData.rank}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">
                  办公室
                </div>
                <div className="col-span-2 font-medium flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                  {teacherData.office || "暂无"}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">
                  入职日期
                </div>
                <div className="col-span-2 font-medium">
                  {formattedHireDate}
                </div>
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
              <div className="text-sm text-gray-500 dark:text-gray-400">
                入职日期
              </div>
              <div className="font-medium mt-1">{formattedHireDate}</div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Award className="h-6 w-6 text-purple-500 mb-2" />
              <div className="text-sm text-gray-500 dark:text-gray-400">
                当前状态
              </div>
              <div className={`font-medium mt-1 ${statusInfo.textColor}`}>
                {statusInfo.text}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Clock className="h-6 w-6 text-green-500 mb-2" />
              <div className="text-sm text-gray-500 dark:text-gray-400">
                课程数量
              </div>
              <div className="font-medium mt-1">
                {courseCount}门
              </div>
            </div>
          </div>
        </div>

        {/* 课程列表展示 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-blue-500" />
              正在教授的课程
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <CourseList
              courses={teacherCourses}
              isStudentView={true} // 设置为只读模式
            />
          </div>
        </div>

        {/* 页脚 */}
        <div className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} 教师信息管理系统</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailPage;

// 添加格式化日程的辅助函数
const formatSchedule = (schedule: any): string => {
  if (!schedule) {
    return "暂无课程安排";
  }
  
  // 处理可能的JSON对象或字符串
  try {
    if (typeof schedule === 'string') {
      // 如果已经是字符串，直接返回
      return schedule;
    } else if (typeof schedule === 'object') {
      // 如果是对象，尝试转换为可读性较好的字符串
      const scheduleEntries = Object.entries(schedule);
      if (scheduleEntries.length > 0) {
        return scheduleEntries.map(([day, time]) => `${day}: ${time}`).join(', ');
      }
    }
  } catch (error) {
    console.error("格式化课程安排失败:", error);
  }
  
  return "暂无课程安排";
};
