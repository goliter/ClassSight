import React from 'react';
import { User } from 'lucide-react';

interface StudentProfileCardProps {
  studentName?: string;
  studentId?: string;
  className?: string;
  attendanceRate?: string;
  focusLevel?: string;
}

const StudentProfileCard: React.FC<StudentProfileCardProps> = ({
  studentName = '学生姓名',
  studentId = '20230001',
  className = '计算机科学与技术1班',
  attendanceRate = '98%',
  focusLevel = '85%'
}) => {
  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto flex items-center justify-center mb-4">
          <User className="h-12 w-12 text-blue-500 dark:text-blue-300" />
        </div>
        <h2 className="text-xl font-bold">{studentName}</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">学号：{studentId}</p>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300">班级</span>
          <span>{className}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300">出勤率</span>
          <span className="text-green-600 dark:text-green-400">{attendanceRate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300">平均专注度</span>
          <span className="text-blue-600 dark:text-blue-400">{focusLevel}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;