import React from 'react';
import { BookOpen } from 'lucide-react';

interface CourseCardProps {
  title: string;
  teacher: string;
  department: string;
  type: string;
  schedule: string;
  bgColor: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  teacher,
  department,
  type,
  schedule,
  bgColor
}) => {
  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md overflow-hidden">
      <div className={`h-40 ${bgColor} flex items-center justify-center`}>
        <BookOpen className="h-16 w-16 text-white opacity-75" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {teacher} · {department}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
            {type}
          </span>
          <span className="text-sm">{schedule}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;