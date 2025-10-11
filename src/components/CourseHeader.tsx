import React from "react";
import { ChevronLeft, User, BookOpen } from "lucide-react";

interface CourseHeaderProps {
  courseName: string;
  courseId: string;
  teacher: string;
  credits: number;
  semester: string;
  onBack: () => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  courseName,
  courseId,
  teacher,
  credits,
  semester,
  onBack,
}) => {
  return (
    <>
      {/* 返回按钮 */}
      <button
        className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors"
        onClick={onBack}
      >
        <ChevronLeft size={20} />
        <span>返回课程列表</span>
      </button>

      {/* 课程基本信息卡片 */}
      <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{courseName}</h2>
            <p className="text-gray-500 dark:text-gray-400">课程ID: {courseId}</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
            {credits}学分
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span>授课教师: {teacher}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <BookOpen className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span>学期: {semester}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseHeader;