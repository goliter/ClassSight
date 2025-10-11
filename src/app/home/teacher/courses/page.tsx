"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import StudentNavigation from "@/components/StudentNavigation";
import TeacherCourseHeader from '@/components/TeacherCourseHeader';
import CourseList from '@/components/CourseList';

interface Course {
  id: string;
  name: string;
  teacher: string;
  department: string;
  type: string;
  description: string;
  studentCount: number;
  schedule: string;
  location: string;
  status: "not-started" | "in-progress" | "completed";
  bgColor: string;
}

const TeacherCoursesPage: React.FC = () => {
  // 模拟老师的课程数据
  const courses: Course[] = [
    {
      id: "1",
      name: "Web前端开发",
      teacher: "张教授",
      department: "信息工程学院",
      type: "理论课程",
      description: "介绍现代Web前端开发技术，包括HTML、CSS、JavaScript以及React框架",
      studentCount: 35,
      schedule: "周一 14:00-16:00",
      location: "A301教室",
      status: "in-progress",
      bgColor: "bg-blue-500 dark:bg-blue-700"
    },
    {
      id: "2",
      name: "数据结构与算法",
      teacher: "王教授",
      department: "信息工程学院",
      type: "理论课程",
      description: "讲解计算机数据结构和算法的基础理论与应用",
      studentCount: 42,
      schedule: "周三 09:00-11:00",
      location: "B203教室",
      status: "in-progress",
      bgColor: "bg-purple-500 dark:bg-purple-700"
    },
    {
      id: "3",
      name: "计算机网络",
      teacher: "李教授",
      department: "信息工程学院",
      type: "理论课程",
      description: "介绍计算机网络的基本原理、协议和应用",
      studentCount: 38,
      schedule: "周五 13:30-15:30",
      location: "C402教室",
      status: "not-started",
      bgColor: "bg-green-500 dark:bg-green-700"
    },
    {
      id: "4",
      name: "操作系统原理",
      teacher: "赵教授",
      department: "信息工程学院",
      type: "理论课程",
      description: "讲解操作系统的基本概念、结构和实现原理",
      studentCount: 29,
      schedule: "周二 10:00-12:00",
      location: "A205教室",
      status: "completed",
      bgColor: "bg-yellow-500 dark:bg-amber-700"
    }
  ];

  const handleAddCourse = () => {
    // 创建新课程的逻辑
    console.log('创建新课程');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
      {/* 顶部导航 */}
      <PageHeader title="ClassSight" welcomeText="欢迎，老师" />

      {/* 导航菜单 */}
      <StudentNavigation role={1} />

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8">
        <TeacherCourseHeader 
          title="我的课程" 
          onAddCourse={handleAddCourse}
          role={1}
        />

        {/* 课程列表 */}
        <CourseList courses={courses} isStudentView={false} />
      </main>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default TeacherCoursesPage;
