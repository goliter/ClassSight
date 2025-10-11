import React from 'react';

interface StatItem {
  label: string;
  value: string;
  color: string;
}

interface StudyStatsProps {
  stats: StatItem[];
}

const StudyStats: React.FC<StudyStatsProps> = ({ stats }) => {
  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">学习数据</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const colorClasses = {
            green: 'text-green-600 dark:text-green-400',
            blue: 'text-blue-600 dark:text-blue-400',
            purple: 'text-purple-600 dark:text-purple-400',
            amber: 'text-amber-600 dark:text-amber-400'
          };
          
          return (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                {stat.label}
              </p>
              <p className={`text-2xl font-bold ${colorClasses[stat.color as keyof typeof colorClasses] || ''}`}>
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudyStats;