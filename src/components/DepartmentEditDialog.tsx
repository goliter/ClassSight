import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  teacherCount: number;
  studentCount: number;
}

interface DepartmentEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingDepartment: Partial<Department>;
  setEditingDepartment: React.Dispatch<React.SetStateAction<Partial<Department>>>;
  onEditDepartment: () => void;
}

const DepartmentEditDialog: React.FC<DepartmentEditDialogProps> = ({
  open,
  onOpenChange,
  editingDepartment,
  setEditingDepartment,
  onEditDepartment
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>编辑学院</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-name" className="text-right text-sm font-medium">
              学院名称
            </label>
            <Input
              id="edit-name"
              value={editingDepartment.name || ''}
              onChange={(e) => setEditingDepartment({ ...editingDepartment, name: e.target.value })}
              className="col-span-3"
              placeholder="请输入学院名称"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-code" className="text-right text-sm font-medium">
              学院代码
            </label>
            <Input
              id="edit-code"
              value={editingDepartment.code || ''}
              onChange={(e) => setEditingDepartment({ ...editingDepartment, code: e.target.value })}
              className="col-span-3"
              placeholder="请输入学院代码"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-description" className="text-right text-sm font-medium">
              学院描述
            </label>
            <Textarea
              id="edit-description"
              value={editingDepartment.description || ''}
              onChange={(e) => setEditingDepartment({ ...editingDepartment, description: e.target.value })}
              className="col-span-3"
              placeholder="请输入学院描述"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={onEditDepartment}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentEditDialog;