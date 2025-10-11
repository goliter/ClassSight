import React from "react";
import { BarChart2 } from "lucide-react";

const PerformanceSection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart2 className="h-5 w-5 text-blue-500" />
        <h3 className="text-xl font-semibold">课堂表现</h3>
      </div>
      
      <div className="h-80 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800/50 rounded-lg">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="mb-2">课堂表现数据将在此处显示</p>
          <p className="text-sm">包括出勤率、参与度、作业完成情况等统计信息</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSection;