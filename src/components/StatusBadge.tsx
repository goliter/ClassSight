import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
  type?: 'teacher' | 'department' | 'course';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'teacher' }) => {
  switch (type) {
    case 'teacher':
      switch (status) {
        case 'active':
          return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">在职</Badge>;
        case 'onLeave':
          return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">休假</Badge>;
        case 'resigned':
          return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">离职</Badge>;
        default:
          return <Badge>{status}</Badge>;
      }
    case 'department':
      // 部门状态样式可以在这里添加
      return <Badge>{status}</Badge>;
    case 'course':
      // 课程状态样式可以在这里添加
      return <Badge>{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default StatusBadge;