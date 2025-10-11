import React from "react";
import { Calendar, Clock } from "lucide-react";

interface ScheduleItem {
  day: string;
  time: string;
  location: string;
}

interface CourseScheduleProps {
  schedule: ScheduleItem[];
}

const CourseSchedule: React.FC<CourseScheduleProps> = ({ schedule }) => {
  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">上课时间安排</h3>
      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div key={index} className="flex items-start space-x-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex flex-col items-center mt-1">
              <Calendar className="h-5 w-5 text-blue-500 mb-1" />
              <div className="w-px h-full bg-gray-300 dark:bg-gray-700 my-1"></div>
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{item.day}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">{item.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <Clock className="h-4 w-4" />
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSchedule;