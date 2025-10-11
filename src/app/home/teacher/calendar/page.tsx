"use client";

import React from 'react';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import StudentNavigation from '@/components/StudentNavigation';
import CalendarContainer from '@/components/CalendarContainer';
import TodayEventsList from '@/components/TodayEventsList';
import { EventItem } from '@/components/TodayEventsList';

const TeacherCalendarPage: React.FC = () => {
  // 模拟今日课程数据
  const todayEvents: EventItem[] = [
    {
      id: '1',
      title: 'Web前端开发',
      teacher: '王老师',
      time: '14:00-16:00',
      status: 'pending',
      iconColor: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
    },
    {
      id: '2',
      title: '办公时间',
      teacher: '王老师',
      time: '16:30-17:30',
      status: 'pending',
      iconColor: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
    }
  ];

  // 模拟有事件的日期
  const eventDays = [1, 5, 10, 15, 20, 25, 28];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
      {/* 顶部导航 */}
      <PageHeader title="ClassSight" welcomeText="欢迎，老师" />

      {/* 导航菜单 */}
      <StudentNavigation role={1} />

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">教学日历</h2>
        
        {/* 日历控件 */}
        <CalendarContainer eventDays={eventDays} />
        
        {/* 今日课程列表 */}
        <TodayEventsList events={todayEvents} />
      </main>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default TeacherCalendarPage;