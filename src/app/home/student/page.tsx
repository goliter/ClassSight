import React from 'react';
import StudentNavigation from '@/components/StudentNavigation';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import StudentProfileCard from '@/components/StudentProfileCard';
import CurrentCourse from '@/components/CurrentCourse';
import TodayCourses from '@/components/TodayCourses';
import PerformanceChart from '@/components/PerformanceChart';

const StudentHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
      {/* 顶部导航 */}
      <PageHeader />
      
      {/* 导航菜单 */}
      <StudentNavigation role={0} />
      
      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 左侧面板 - 个人信息 */}
          <StudentProfileCard />
          
          {/* 中间面板 - 课程概览 */}
          <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">课程概览</h2>
            <div className="space-y-4">
              {/* 当前课程 */}
              <CurrentCourse />
              
              {/* 今日课程 */}
              <TodayCourses />
            </div>
          </div>
        </div>
        
        {/* 最近表现 */}
        <div className="mt-6">
          <PerformanceChart />
        </div>
      </main>
      
      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default StudentHomePage;