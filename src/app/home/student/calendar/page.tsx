"use client"

import React, { useState } from "react";
import StudentNavigation from "@/components/StudentNavigation";
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import CalendarNavigation from '@/components/CalendarNavigation';
import CalendarGrid from '@/components/CalendarGrid';
import TodayEventsList from '@/components/TodayEventsList';
// 导入EventItem类型以获得正确的类型推断
import type { EventItem } from '@/components/TodayEventsList';

const CalendarPage: React.FC = () => {
  const [currentMonth] = useState('2024年10月');
  
  // 模拟日历数据
  const calendarData = {
    daysInMonth: 31,
    daysFromPrevMonth: 3,
    daysFromNextMonth: 7,
    currentDay: new Date().getDate(),
    currentMonthIndex: 9, // 10月
    eventDays: [5, 12, 19, 26]
  };

  // 模拟今日课程数据 - 显式指定类型
  const todayEvents: EventItem[] = [
    {
      id: '1',
      title: '高等数学',
      teacher: '李老师',
      time: '8:00-10:00',
      status: 'completed',
      iconColor: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      id: '2',
      title: '大学物理',
      teacher: '张老师',
      time: '14:00-16:00',
      status: 'pending',
      iconColor: 'bg-yellow-100 dark:bg-yellow-900'
    }
  ];

  const handlePrevMonth = () => {
    // 切换到上个月的逻辑
    console.log('上个月');
  };

  const handleNextMonth = () => {
    // 切换到下个月的逻辑
    console.log('下个月');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
      {/* 顶部导航 */}
      <PageHeader />

      <StudentNavigation />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">学习日历</h2>

        <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6">
          {/* 日历导航 */}
          <CalendarNavigation 
            currentMonth={currentMonth}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />

          {/* 日历网格 */}
          <CalendarGrid 
            daysInMonth={calendarData.daysInMonth}
            daysFromPrevMonth={calendarData.daysFromPrevMonth}
            daysFromNextMonth={calendarData.daysFromNextMonth}
            currentDay={calendarData.currentDay}
            currentMonthIndex={calendarData.currentMonthIndex}
            eventDays={calendarData.eventDays}
          />
        </div>

        {/* 今日事件 */}
        <TodayEventsList events={todayEvents} />
      </main>
      
      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default CalendarPage;
