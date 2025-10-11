import React from "react";
import { Plus } from "lucide-react";

interface TeacherCourseHeaderProps {
  title: string;
  onAddCourse: () => void;
  role: number;
}

const TeacherCourseHeader: React.FC<TeacherCourseHeaderProps> = ({
  title,
  onAddCourse,
  role,
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      {role === 1 && (
        <button
          onClick={onAddCourse}
          className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>创建新课程</span>
        </button>
      )}
    </div>
  );
};

export default TeacherCourseHeader;