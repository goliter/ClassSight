import React from 'react';
import { Badge } from '@/components/ui/badge';

interface RankBadgeProps {
  rank: string;
}

const RankBadge: React.FC<RankBadgeProps> = ({ rank }) => {
  switch (rank) {
    case '教授':
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">教授</Badge>;
    case '副教授':
      return <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">副教授</Badge>;
    case '讲师':
      return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">讲师</Badge>;
    case '助教':
      return <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300">助教</Badge>;
    default:
      return <Badge>{rank}</Badge>;
  }
};

export default RankBadge;