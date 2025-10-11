import React from 'react';
import { BookOpen } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  teacher: string;
  time: string;
  status: 'completed' | 'pending' | 'ongoing';
  iconColor: string;
}

interface TodayEventsListProps {
  events: EventItem[];
}

const TodayEventsList: React.FC<TodayEventsListProps> = ({ events }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'ongoing':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'pending':
        return '待开始';
      case 'ongoing':
        return '进行中';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">今日课程</h3>
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className={`w-12 h-12 ${event.iconColor} rounded-lg flex items-center justify-center mr-4`}>
              <BookOpen className={`h-6 w-6 ${event.iconColor.includes('blue') ? 'text-blue-600 dark:text-blue-400' : 'text-yellow-600 dark:text-yellow-400'}`} />
            </div>
            <div className="flex-grow">
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {event.teacher} · {event.time}
              </p>
            </div>
            <span className={`${getStatusClass(event.status)} text-xs px-2 py-1 rounded-full`}>
              {getStatusText(event.status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayEventsList;
export type { EventItem };