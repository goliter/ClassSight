"use client";

import React, { useState } from "react";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import StudentNavigation from "@/components/StudentNavigation";
import TeacherProfileCard from "@/components/TeacherProfileCard";
import ContactInfo from '@/components/ContactInfo';
import TeachingPerformance from '@/components/TeachingPerformance';
import OfficeHours from '@/components/OfficeHours';
import EditButton from '@/components/EditButton';

interface TeachingPerformance {
  courseId: string;
  courseName: string;
  evaluationScore: number;
  studentCount: number;
  completionRate: number;
}

const TeacherProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState({
    name: "王老师",
    id: "20230001",
    collegeName: "计算机与控制工程学院",
    rank: "副教授",
    courseNumber: "5",
    email: "wang.teacher@example.com",
    phone: "13800138000",
    office: "科技楼402室"
  });

  // 模拟教学表现数据
  const teachingPerformance: TeachingPerformance[] = [
    {
      courseId: "1",
      courseName: "Web前端开发",
      evaluationScore: 4.8,
      studentCount: 35,
      completionRate: 95
    },
    {
      courseId: "2",
      courseName: "数据结构与算法",
      evaluationScore: 4.7,
      studentCount: 42,
      completionRate: 92
    },
    {
      courseId: "3",
      courseName: "计算机网络",
      evaluationScore: 4.5,
      studentCount: 38,
      completionRate: 88
    }
  ];

  // 模拟办公时间
  const officeHours = [
    { day: "周一", time: "16:30-17:30" },
    { day: "周三", time: "15:00-16:00" },
    { day: "周五", time: "14:00-15:00" }
  ];

  // 处理编辑模式切换
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
      {/* 顶部导航 */}
      <PageHeader title="ClassSight" welcomeText="欢迎，老师" />

      {/* 导航菜单 */}
      <StudentNavigation role={1} />

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 左侧面板 - 个人信息卡片 */}
          <div className="md:col-span-1">
            <TeacherProfileCard 
              teacherName={teacherInfo.name}
              teacherId={teacherInfo.id}
              collegeName={teacherInfo.collegeName}
              rank={teacherInfo.rank}
              courseNumber={teacherInfo.courseNumber}
            />
            
            {/* 添加间距 */}
            <div className="my-8"></div>
            
            {/* 联系方式 */}
            <ContactInfo 
              email={teacherInfo.email}
              phone={teacherInfo.phone}
              office={teacherInfo.office}
            />
          </div>
          
          {/* 右侧面板 - 详细信息 */}
          <div className="md:col-span-2 space-y-6">
            {/* 编辑按钮 */}
            <EditButton 
              isEditing={isEditing}
              onToggleEdit={handleEditToggle}
            />
            
            {/* 教学表现 */}
            <TeachingPerformance performanceData={teachingPerformance} />
            
            {/* 办公时间 */}
            <OfficeHours hours={officeHours} />
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default TeacherProfilePage;
