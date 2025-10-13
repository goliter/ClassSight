import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminBadgeProps {
  adminId: string;
  adminName: string;
  readOnly?: boolean;
  onRemove?: () => void;
}

const AdminBadge: React.FC<AdminBadgeProps> = ({ adminId, adminName, readOnly = false, onRemove }) => {
  return (
    <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 flex items-center gap-1">
      {adminName}
      {!readOnly && onRemove && (
        <Button
          variant="ghost"
          size="sm"
          className="h-4 w-4 p-0 ml-1 rounded-full hover:bg-red-50 hover:text-red-600"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </Badge>
  );
};

export default AdminBadge;