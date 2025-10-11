import React, { useState } from 'react';
import CalendarNavigation from './CalendarNavigation';
import CalendarGrid from './CalendarGrid';

interface CalendarContainerProps {
  initialMonth?: Date;
  eventDays?: number[];
}

const CalendarContainer: React.FC<CalendarContainerProps> = ({ 
  initialMonth = new Date(), 
  eventDays = [] 
}) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  // 计算当前月份的天数
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // 计算当前月份第一天是星期几
  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // 计算上个月在日历中显示的天数
  const getDaysFromPrevMonth = (date: Date) => {
    const firstDayOfMonth = getFirstDayOfMonth(date);
    return firstDayOfMonth;
  };

  // 计算下个月在日历中显示的天数
  const getDaysFromNextMonth = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDayOfMonth = getFirstDayOfMonth(date);
    const totalCells = 42; // 6行7列的日历网格
    const daysFromPrevMonth = firstDayOfMonth;
    const daysFromNextMonth = totalCells - (daysInMonth + daysFromPrevMonth);
    return daysFromNextMonth;
  };

  // 切换到上个月
  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  // 切换到下个月
  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  // 格式化月份显示
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6">
      {/* 日历导航 */}
      <CalendarNavigation
        currentMonth={formatMonth(currentMonth)}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      
      {/* 日历网格 */}
      <CalendarGrid
        daysInMonth={getDaysInMonth(currentMonth)}
        daysFromPrevMonth={getDaysFromPrevMonth(currentMonth)}
        daysFromNextMonth={getDaysFromNextMonth(currentMonth)}
        currentDay={new Date().getDate()}
        currentMonthIndex={currentMonth.getMonth()}
        eventDays={eventDays}
      />
    </div>
  );
};

export default CalendarContainer;