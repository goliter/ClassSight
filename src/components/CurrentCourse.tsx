import React from 'react';

interface CurrentCourseProps {
  courseName?: string;
  teacherName?: string;
  schedule?: string;
}

const CurrentCourse: React.FC<CurrentCourseProps> = ({
  courseName = 'Web前端开发',
  teacherName = '王老师',
  schedule = '周一 14:00-16:00'
}) => {
  return (
    <div className="border-l-4 border-blue-500 pl-4 py-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{courseName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{teacherName} · {schedule}</p>
        </div>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">进行中</span>
      </div>
    </div>
  );
};

export default CurrentCourse;