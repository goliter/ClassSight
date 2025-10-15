"use client";

import React from "react";
import { useRouter } from "next/navigation";
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

// 教师接口定义
interface Teacher {
  id: string;
  name: string;
  teacherId: string;
  departmentId: string;
  departmentName: string;
  rank: string;
  email: string;
  phone: string;
  office: string;
  hireDate: string;
  status: "active" | "onLeave" | "resigned";
  courseCount: number;
  studentCount: number;
}

// 课程接口定义 - 与CourseList组件保持一致
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
  const teacherId = params.id;

  // 模拟教师数据 - 实际项目中应从API获取
  const getTeacherData = (id: string): Teacher => {
    const teachers: Teacher[] = [
      {
        id: "1",
        name: "张教授",
        teacherId: "T10001",
        departmentId: "1",
        departmentName: "信息科学与技术学院",
        rank: "教授",
        email: "zhang.prof@example.com",
        phone: "13900139001",
        office: "科技楼401室",
        hireDate: "2010-09-01",
        status: "active",
        courseCount: 3,
        studentCount: 120,
      },
      {
        id: "2",
        name: "李副教授",
        teacherId: "T10002",
        departmentId: "1",
        departmentName: "信息科学与技术学院",
        rank: "副教授",
        email: "li.assoc@example.com",
        phone: "13900139002",
        office: "科技楼402室",
        hireDate: "2015-09-01",
        status: "active",
        courseCount: 4,
        studentCount: 150,
      },
      {
        id: "3",
        name: "王讲师",
        teacherId: "T10003",
        departmentId: "2",
        departmentName: "人工智能学院",
        rank: "讲师",
        email: "wang.lect@example.com",
        phone: "13900139003",
        office: "智能楼301室",
        hireDate: "2020-09-01",
        status: "onLeave",
        courseCount: 0,
        studentCount: 0,
      },
      {
        id: "4",
        name: "赵助教",
        teacherId: "T10004",
        departmentId: "3",
        departmentName: "数学与统计学院",
        rank: "助教",
        email: "zhao.assist@example.com",
        phone: "13900139004",
        office: "数理楼201室",
        hireDate: "2022-09-01",
        status: "resigned",
        courseCount: 0,
        studentCount: 0,
      },
    ];

    // 根据ID查找教师
    const teacher = teachers.find((t) => t.id === id);
    // 如果找不到，返回默认教师
    return teacher || teachers[0];
  };

  // 模拟教师课程数据
  const getTeacherCourses = (teacherId: string): Course[] => {
    // 为不同教师设置不同的课程
    const courseMap: Record<string, Course[]> = {
      "1": [
        {
          id: "c1",
          name: "Web前端开发",
          teacher: "张教授",
          department: "信息科学与技术学院",
          type: "理论课程",
          schedule: "周一 14:00-16:00",
          bgColor: "bg-blue-500 dark:bg-blue-700",
        },
        {
          id: "c2",
          name: "React框架进阶",
          teacher: "张教授",
          department: "信息科学与技术学院",
          type: "实践课程",
          schedule: "周三 09:00-11:00",
          bgColor: "bg-green-500 dark:bg-green-700",
        },
        {
          id: "c3",
          name: "前端性能优化",
          teacher: "张教授",
          department: "信息科学与技术学院",
          type: "专业选修课",
          schedule: "周五 13:30-15:30",
          bgColor: "bg-purple-500 dark:bg-purple-700",
        },
      ],
      "2": [
        {
          id: "c4",
          name: "数据结构与算法",
          teacher: "李副教授",
          department: "信息科学与技术学院",
          type: "专业必修课",
          schedule: "周二 10:00-12:00",
          bgColor: "bg-blue-500 dark:bg-blue-700",
        },
        {
          id: "c5",
          name: "操作系统原理",
          teacher: "李副教授",
          department: "信息科学与技术学院",
          type: "专业必修课",
          schedule: "周四 14:00-16:00",
          bgColor: "bg-green-500 dark:bg-green-700",
        },
        {
          id: "c6",
          name: "计算机网络",
          teacher: "李副教授",
          department: "信息科学与技术学院",
          type: "专业必修课",
          schedule: "周五 09:00-11:00",
          bgColor: "bg-purple-500 dark:bg-purple-700",
        },
        {
          id: "c7",
          name: "软件工程导论",
          teacher: "李副教授",
          department: "信息科学与技术学院",
          type: "专业必修课",
          schedule: "周三 13:30-15:30",
          bgColor: "bg-amber-500 dark:bg-amber-700",
        },
      ],
      "3": [
        {
          id: "c8",
          name: "人工智能导论",
          teacher: "王讲师",
          department: "人工智能学院",
          type: "专业必修课",
          schedule: "周一 09:00-11:00",
          bgColor: "bg-blue-500 dark:bg-blue-700",
        },
        {
          id: "c9",
          name: "机器学习基础",
          teacher: "王讲师",
          department: "人工智能学院",
          type: "专业选修课",
          schedule: "周二 14:00-16:00",
          bgColor: "bg-green-500 dark:bg-green-700",
        },
        {
          id: "c10",
          name: "深度学习原理",
          teacher: "王讲师",
          department: "人工智能学院",
          type: "专业选修课",
          schedule: "周四 10:00-12:00",
          bgColor: "bg-purple-500 dark:bg-purple-700",
        },
      ],
    };

    // 返回对应教师的课程，如果没有则返回默认课程
    return courseMap[teacherId] || courseMap["1"];
  };

  const teacherData = getTeacherData(teacherId);
  const teacherCourses = getTeacherCourses(teacherId);

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

  const statusInfo = getStatusInfo(teacherData.status);

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
                  {teacherData.phone}
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
                  {teacherData.departmentName}
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
                  {teacherData.office}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">
                  入职日期
                </div>
                <div className="col-span-2 font-medium">
                  {teacherData.hireDate}
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
              <div className="font-medium mt-1">{teacherData.hireDate}</div>
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
                学生人数
              </div>
              <div className="font-medium mt-1">
                {teacherData.studentCount}人
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
