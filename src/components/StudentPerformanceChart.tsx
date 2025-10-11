import React from "react";

interface PerformanceChartProps {
  title?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  title = "学生表现",
}) => {
  // 在实际项目中，这里可以集成真实的图表库
  // 目前仅提供模拟的图表占位符
  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">表现数据图表区域</p>
      </div>
    </div>
  );
};

export default PerformanceChart;
