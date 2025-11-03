/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import StudentNavigation from "@/components/StudentNavigation";
import TodayEventsList from "@/components/TodayEventsList";
import { EventItem } from "@/components/TodayEventsList";
import { Calendar } from "@/components/ui/calendar";

const StudentCalendarPage: React.FC = () => {
  // 跟踪选中的日期
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // 课程数据
  const [courseData, setCourseData] = useState<Record<string, EventItem[]>>({});
  // 加载状态
  const [loading, setLoading] = useState<boolean>(true);
  // 错误状态
  const [error, setError] = useState<string | null>(null);

  // 从API获取所有课程数据
  useEffect(() => {
    const fetchAllCourses = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 发送请求获取所有课程
        const response = await fetch('/api/course', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`获取课程数据失败: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 处理获取到的课程数据，按照日期组织
        const formattedData: Record<string, EventItem[]> = {};
        
        // 检查是否有数据
        if (data.status === 'success' && data.data && Array.isArray(data.data)) {
          data.data.forEach((course: any) => {
            // 处理课程的schedule
            if (course.schedule && Array.isArray(course.schedule)) {
              course.schedule.forEach((scheduleItem: any, index: number) => {
                if (scheduleItem.date) {
                  // 获取日期键
                  const dateKey = scheduleItem.date;
                  
                  // 确保日期键存在
                  if (!formattedData[dateKey]) {
                    formattedData[dateKey] = [];
                  }
                  
                  // 创建事件项
                  formattedData[dateKey].push({
                    id: `${course.id}-${index}`,
                    title: course.name || '未知课程',
                    teacher: course.teacher?.name || '未知教师',
                    time: scheduleItem.time || '时间待定',
                    status: getEventStatus(scheduleItem.date, scheduleItem.time),
                    iconColor: getIconColor(course.type)
                  });
                }
              });
            }
          });
        }
        
        // 对每个日期的事件按时间排序
        Object.keys(formattedData).forEach(dateKey => {
          formattedData[dateKey].sort((a, b) => {
            return a.time.localeCompare(b.time);
          });
        });
        
        setCourseData(formattedData);
      } catch (err) {
        console.error('获取课程数据失败:', err);
        setError('获取课程数据失败，请稍后重试');
        // 保持空数据对象
        setCourseData({});
      } finally {
        setLoading(false);
      }
    };
    
    // 执行数据获取
    fetchAllCourses();
  }, []);
  
  // 根据课程类型获取图标颜色
  const getIconColor = (courseType?: string): string => {
    const colorMap: Record<string, string> = {
      '必修课': 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
      '专业课程': 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
      '选修课': 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
      '通识课': 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300',
      '实践课': 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300'
    };
    return colorMap[courseType || ''] || 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300';
  };
  
  // 获取事件状态
  const getEventStatus = (dateStr: string, timeStr?: string): 'completed' | 'pending' | 'ongoing' => {
    const eventDate = new Date(dateStr);
    const now = new Date();
    
    // 简化版本：只比较日期
    // 更复杂的实现可以考虑时间部分
    if (eventDate < now) {
      return 'completed';
    } else if (eventDate.getTime() === now.getTime()) {
      return 'ongoing';
    } else {
      return 'pending';
    }
  };

  // 根据选中的日期获取对应的课程
  const getEventsForDate = (date: Date) => {
    // 修复时区问题，确保使用本地日期而非UTC日期
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
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
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
      {/* 顶部导航 */}
      <PageHeader title="ClassSight" />

      {/* 导航菜单 */}
      <StudentNavigation role={2} />

      {/* 主要内容区域 - 水平布局 */}
      <main className="container mx-auto px-4 py-8">

        <h2 className="text-2xl font-bold mb-6">管理员日历</h2>

        {/* 加载状态显示 */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">正在加载课程数据...</h3>
          </div>
        )}
        
        {/* 错误状态显示 */}
        {error && !loading && (
          <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg">
            <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
          </div>
        )}
        
        {/* 水平布局容器 - 仅在数据加载完成且无错误时显示 */}
        {!loading && !error && (
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
                  <svg
                    className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  该日期没有安排课程
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default StudentCalendarPage;
