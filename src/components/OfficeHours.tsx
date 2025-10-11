import React from 'react';
import { Clock } from 'lucide-react';

interface OfficeHourItem {
  day: string;
  time: string;
}

interface OfficeHoursProps {
  hours: OfficeHourItem[];
}

const OfficeHours: React.FC<OfficeHoursProps> = ({ hours }) => {
  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Clock className="h-5 w-5 mr-2 text-blue-500" />
        办公时间
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hours.map((item, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="font-medium">{item.day}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {item.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficeHours;