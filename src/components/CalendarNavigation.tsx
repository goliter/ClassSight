import React from 'react';

interface CalendarNavigationProps {
  currentMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  currentMonth,
  onPrevMonth,
  onNextMonth
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <button 
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={onPrevMonth}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h3 className="text-xl font-semibold">{currentMonth}</h3>
      <button 
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={onNextMonth}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default CalendarNavigation;