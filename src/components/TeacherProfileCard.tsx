import React from "react";
import { User } from "lucide-react";

interface StudentProfileCardProps {
  teacherName?: string;
  teacherId?: string;
  collegeName?: string;
  rank?: string;
  courseNumber?: string;
}

const TeacherProfileCard: React.FC<StudentProfileCardProps> = ({
  teacherName = "教师姓名",
  teacherId = "20230001",
  collegeName = "计算机与控制工程学院",
  rank = "副教授",
  courseNumber = "5",
}) => {
  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto flex items-center justify-center mb-4">
          <User className="h-12 w-12 text-blue-500 dark:text-blue-300" />
        </div>
        <h2 className="text-xl font-bold">{teacherName}</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          工号：{teacherId}
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300">学院</span>
          <span>{collegeName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300">职务</span>
          <span className="text-green-600 dark:text-green-400">
            {rank}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300">课程数量</span>  
          <span className="text-blue-600 dark:text-blue-400">{courseNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileCard;
