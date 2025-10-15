"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BookOpen, ChevronLeft, User, Building2, GraduationCap, Calendar, MapPin, Award, Clock, Users } from "lucide-react";
import { Badge } from '@/components/ui/badge';

interface CourseDetailPageProps {
  params: { id: string };
}

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
  description: string;
  status: 'active' | 'inactive' | 'pending';
  schedule: Array<{
    day: string;
    time: string;
    location: string;
  }>;
  studentCount: number;
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
  status: 'active' | 'suspended' | 'graduated';
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const courseId = params.id;

  // 模拟课程数据 - 实际项目中应从API获取
  const getCourseData = (id: string): Course => {
    const courses: Course[] = [
      {
        id: '1',
        name: 'Web前端开发',
        code: 'CS1001',
        teacherId: 'T10001',
        teacherName: '张教授',
        departmentId: '1',
        departmentName: '信息科学与技术学院',
        credits: 3,
        description: '学习Web前端开发技术，包括HTML、CSS、JavaScript等核心技术，以及现代前端框架的应用。通过本课程学习，学生将能够独立开发具有良好用户体验的Web应用程序。',
        status: 'active',
        schedule: [
          { day: '周一', time: '14:00-16:00', location: 'A301教室' },
          { day: '周三', time: '09:00-11:00', location: 'B202教室' },
          { day: '周五', time: '16:00-18:00', location: 'C105教室' }
        ],
        studentCount: 35
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
        description: '学习数据结构的基本概念和常用算法，培养学生分析和设计算法的能力，为后续专业课程学习奠定基础。',
        status: 'active',
        schedule: [
          { day: '周二', time: '10:00-12:00', location: 'A401教室' },
          { day: '周四', time: '14:00-16:00', location: 'B302教室' }
        ],
        studentCount: 42
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
        description: '介绍人工智能的基本概念和应用领域，包括机器学习、深度学习、自然语言处理等方面的基础知识。',
        status: 'pending',
        schedule: [
          { day: '周一', time: '08:00-10:00', location: 'C201教室' },
          { day: '周三', time: '14:00-16:00', location: 'C202教室' }
        ],
        studentCount: 50
      }
    ];

    // 如果找不到对应ID的课程，返回第一个课程
    return courses.find(course => course.id === id) || courses[0];
  };

  // 模拟获取选修该课程的学生数据
  const getEnrolledStudents = (courseId: string): Student[] => {
    // 为不同课程设置不同的学生
    const courseStudentMap: Record<string, Student[]> = {
      '1': [
        {
          id: '1',
          name: '张三',
          studentId: '20230001',
          departmentName: '信息科学与技术学院',
          major: '计算机科学与技术',
          grade: '2023',
          class: '计算机1班',
          email: 'zhang.san@example.com',
          phone: '13800138001',
          status: 'active'
        },
        {
          id: '2',
          name: '李四',
          studentId: '20230002',
          departmentName: '信息科学与技术学院',
          major: '软件工程',
          grade: '2023',
          class: '软件2班',
          email: 'li.si@example.com',
          phone: '13800138002',
          status: 'active'
        },
        {
          id: '3',
          name: '王五',
          studentId: '20220001',
          departmentName: '人工智能学院',
          major: '人工智能',
          grade: '2022',
          class: '智能1班',
          email: 'wang.wu@example.com',
          phone: '13800138003',
          status: 'active'
        },
        {
          id: '4',
          name: '赵六',
          studentId: '20210001',
          departmentName: '数学与统计学院',
          major: '应用数学',
          grade: '2021',
          class: '数学1班',
          email: 'zhao.liu@example.com',
          phone: '13800138004',
          status: 'active'
        }
      ],
      '2': [
        {
          id: '5',
          name: '孙七',
          studentId: '20230005',
          departmentName: '信息科学与技术学院',
          major: '计算机科学与技术',
          grade: '2023',
          class: '计算机1班',
          email: 'sun.qi@example.com',
          phone: '13800138005',
          status: 'active'
        },
        {
          id: '6',
          name: '周八',
          studentId: '20230006',
          departmentName: '信息科学与技术学院',
          major: '软件工程',
          grade: '2023',
          class: '软件2班',
          email: 'zhou.ba@example.com',
          phone: '13800138006',
          status: 'active'
        }
      ],
      '3': [
        {
          id: '7',
          name: '吴九',
          studentId: '20220002',
          departmentName: '人工智能学院',
          major: '人工智能',
          grade: '2022',
          class: '智能1班',
          email: 'wu.jiu@example.com',
          phone: '13800138007',
          status: 'active'
        },
        {
          id: '8',
          name: '郑十',
          studentId: '20220003',
          departmentName: '人工智能学院',
          major: '智能科学与技术',
          grade: '2022',
          class: '智能2班',
          email: 'zheng.shi@example.com',
          phone: '13800138008',
          status: 'active'
        }
      ]
    };

    // 如果找不到对应课程的学生，返回空数组
    return courseStudentMap[courseId] || [];
  };

  const courseData = getCourseData(courseId);
  const enrolledStudents = getEnrolledStudents(courseId);

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

        {/* 页脚 */}
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-8">
          © 2024 ClassSight 课程管理系统
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;