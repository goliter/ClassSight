import React from 'react';
import { Award } from 'lucide-react';

interface TeachingPerformanceItem {
  courseId: string;
  courseName: string;
  evaluationScore: number;
  studentCount: number;
  completionRate: number;
}

interface TeachingPerformanceProps {
  performanceData: TeachingPerformanceItem[];
}

const TeachingPerformance: React.FC<TeachingPerformanceProps> = ({ performanceData }) => {
  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Award className="h-5 w-5 mr-2 text-yellow-500" />
        教学表现
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 text-left">课程名称</th>
              <th className="py-3 text-left">评分</th>
              <th className="py-3 text-left">学生人数</th>
              <th className="py-3 text-left">出勤率</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((item) => (
              <tr key={item.courseId} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3">{item.courseName}</td>
                <td className="py-3">{item.evaluationScore}/5.0</td>
                <td className="py-3">{item.studentCount}</td>
                <td className="py-3">{item.completionRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeachingPerformance;