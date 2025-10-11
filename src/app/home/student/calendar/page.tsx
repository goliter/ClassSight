"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import StudentNavigation from '@/components/StudentNavigation';
import TodayEventsList from '@/components/TodayEventsList';
import { EventItem } from '@/components/TodayEventsList';
import { Calendar } from '@/components/ui/calendar';

const StudentCalendarPage: React.FC = () => {
  // 跟踪选中的日期
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // 模拟课程数据，包含不同日期的课程
  const courseData: Record<string, EventItem[]> = {
    // 今天的日期作为键（格式：YYYY-MM-DD）
    "2025-10-13": [
      {
        id: "1",
        title: "高等数学",
        teacher: "李老师",
        time: "08:00-10:00",
        status: "completed",
        iconColor: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
      },
      {
        id: "2",
        title: "大学物理",
        teacher: "张老师",
        time: "14:00-16:00",
        status: "pending",
        iconColor: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300"
      }
    ],
    // 其他日期的课程示例
    "2025-10-11": [
      {
        id: "3",
        title: "线性代数",
        teacher: "王老师",
        time: "09:00-11:00",
        status: "completed",
        iconColor: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
      }
    ],
    "2025-10-12": [
      {
        id: "4",
        title: "计算机基础",
        teacher: "赵老师",
        time: "13:30-15:30",
        status: "ongoing",
        iconColor: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
      }
    ]
  };

  // 根据选中的日期获取对应的课程
  const getEventsForDate = (date: Date) => {
    // 修复时区问题，确保使用本地日期而非UTC日期
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;
    
    return courseData[dateKey] || [];
  };

  // 处理日期选择变化
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  // 获取选中日期的事件
  const selectedDateEvents = getEventsForDate(selectedDate);

  // 格式化选中的日期为可读形式
  const formatSelectedDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
      {/* 顶部导航 */}
      <PageHeader title="ClassSight" />

      {/* 导航菜单 */}
      <StudentNavigation role={0} />

      {/* 主要内容区域 - 水平布局 */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">学习日历</h2>
        
        {/* 水平布局容器 */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 日历部分 - 左侧 */}
          <div className="w-full lg:w-1/4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              className="rounded-md border shadow-sm"
              captionLayout="dropdown"
            />
          </div>
          
          {/* 课程列表部分 - 右侧 */}
          <div className="w-full lg:w-3/4 bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-2">
                {selectedDate.getDate()}
              </span>
              {formatSelectedDate(selectedDate)} 的课程
            </h3>
            
            {selectedDateEvents.length > 0 ? (
              <TodayEventsList events={selectedDateEvents} />
            ) : (
              <div className="text-gray-500 dark:text-gray-400 p-6 text-center border border-dashed border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                该日期没有安排课程
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default StudentCalendarPage;
