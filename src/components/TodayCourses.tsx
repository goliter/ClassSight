import React from 'react';

interface CourseItem {
  id: string;
  name: string;
  teacher: string;
  time: string;
  status: 'completed' | 'pending' | 'in-progress';
}

interface TodayCoursesProps {
  courses?: CourseItem[];
}

const TodayCourses: React.FC<TodayCoursesProps> = ({ courses }) => {
  // 默认的今日课程数据
  const defaultCourses: CourseItem[] = [
    {
      id: '1',
      name: '高等数学',
      teacher: '李老师',
      time: '上午 8:00-10:00',
      status: 'completed'
    },
    {
      id: '2',
      name: '大学物理',
      teacher: '张老师',
      time: '下午 14:00-16:00',
      status: 'pending'
    }
  ];
  
  const courseData = courses || defaultCourses;
  
  // 获取状态样式和文本
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          className: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
          text: '已完成'
        };
      case 'pending':
        return {
          className: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
          text: '待开始'
        };
      case 'in-progress':
        return {
          className: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
          text: '进行中'
        };
      default:
        return {
          className: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
          text: '未知'
        };
    }
  };
  
  return (
    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
      <h3 className="font-medium mb-3">今日课程</h3>
      <div className="space-y-2">
        {courseData.map((course) => {
          const statusInfo = getStatusInfo(course.status);
          return (
            <div key={course.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium">{course.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{course.teacher} · {course.time}</p>
              </div>
              <span className={`text-xs ${statusInfo.className} px-2 py-1 rounded-full`}>
                {statusInfo.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodayCourses;