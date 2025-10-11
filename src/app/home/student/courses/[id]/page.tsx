"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PageHeader from '@/components/PageHeader';
import StudentNavigation from '@/components/StudentNavigation';
import PageFooter from '@/components/PageFooter';
import CourseHeader from '@/components/CourseHeader';
import CourseDescription from '@/components/CourseDescription';
import CourseSchedule from '@/components/CourseSchedule';
import PerformanceSection from '@/components/PerformanceSection';

interface CourseDetailPageProps {
  params: {
    id: string;
  };
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const courseId = params.id;

  // 模拟课程数据 - 实际项目中应从API获取
  const courseData = {
    id: courseId,
    name: "Web前端开发技术",
    teacher: "张教授",
    description: "本课程全面介绍Web前端开发的基础知识和实践技能，包括HTML、CSS、JavaScript等核心技术，以及现代前端框架的应用。通过本课程学习，学生将能够独立开发具有良好用户体验的Web应用程序。",
    schedule: [
      { day: "周一", time: "14:00 - 16:00", location: "A301教室" },
      { day: "周三", time: "09:00 - 11:00", location: "B202教室" },
      { day: "周五", time: "16:00 - 18:00", location: "C105教室" }
    ],
    credits: 3,
    semester: "2024-2025学年第一学期"
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
      {/* 顶部导航 */}
      <PageHeader title="课程详情" />

      <StudentNavigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 课程基本信息 */}
          <CourseHeader
            courseName={courseData.name}
            courseId={courseData.id}
            teacher={courseData.teacher}
            credits={courseData.credits}
            semester={courseData.semester}
            onBack={handleBack}
          />

          {/* 课程简介 */}
          <CourseDescription description={courseData.description} />

          {/* 上课时间安排 */}
          <CourseSchedule schedule={courseData.schedule} />

          {/* 课堂表现区域 */}
          <PerformanceSection />
        </div>
      </main>

      <PageFooter />
    </div>
  );
};

export default CourseDetailPage;