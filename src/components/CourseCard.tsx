import React from 'react';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
  title: string;
  teacher: string;
  department: string;
  type: string;
  schedule: string;
  bgColor: string;
  id: string;
  isStudentView?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  teacher,
  department,
  type,
  schedule,
  bgColor,
  id,
  isStudentView = false
}) => {
  // 为教师视图添加链接到课程详情页的功能
  const cardContent = (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md overflow-hidden h-full">
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

  // 教师视图下添加链接到课程详情页的功能
  if (!isStudentView) {
    return (
      <Link href={`/home/teacher/courses/${id}`} className="block hover:shadow-lg transition-shadow duration-300">
        {cardContent}
      </Link>
    );
  }

  // 学生视图直接返回卡片内容
  return cardContent;
};

export default CourseCard;