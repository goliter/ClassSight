import React from 'react';

interface CalendarGridProps {
  daysInMonth: number;
  daysFromPrevMonth: number;
  daysFromNextMonth: number;
  currentDay: number;
  currentMonthIndex: number;
  eventDays: number[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  daysInMonth,
  daysFromPrevMonth,
  daysFromNextMonth,
  currentDay,
  currentMonthIndex,
  eventDays
}) => {
  // 生成星期标题
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  
  // 生成上个月的日期
  const prevMonthDays = Array(daysFromPrevMonth).fill(null).map((_, i) => ({
    day: 30 - daysFromPrevMonth + i + 1,
    isCurrentMonth: false,
    isToday: false,
    hasEvent: false
  }));
  
  // 生成当月的日期
  const currentMonthDays = Array(daysInMonth).fill(null).map((_, i) => ({
    day: i + 1,
    isCurrentMonth: true,
    isToday: i + 1 === currentDay && new Date().getMonth() === currentMonthIndex,
    hasEvent: eventDays.includes(i + 1)
  }));
  
  // 生成下个月的日期
  const nextMonthDays = Array(daysFromNextMonth).fill(null).map((_, i) => ({
    day: i + 1,
    isCurrentMonth: false,
    isToday: false,
    hasEvent: false
  }));
  
  // 合并所有日期
  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  return (
    <>
      {/* 星期标题 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日历格子 */}
      <div className="grid grid-cols-7 gap-1">
        {allDays.map((dayInfo, index) => {
          const { day, isCurrentMonth, isToday, hasEvent } = dayInfo;
          
          return (
            <div
              key={`day-${index}`}
              className={`h-16 border rounded text-center p-1 relative ${isToday
                ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800'
                : isCurrentMonth
                ? 'border-gray-100 dark:border-gray-800'
                : 'border-gray-100 dark:border-gray-800'}
              `}
            >
              <div
                className={`font-medium ${isToday
                  ? 'text-blue-600 dark:text-blue-400'
                  : isCurrentMonth
                  ? ''
                  : 'text-gray-300 dark:text-gray-600'}
                `}
              >
                {day}
              </div>
              {hasEvent && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CalendarGrid;