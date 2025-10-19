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

interface DepartmentAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newDepartment: Partial<Department>;
  setNewDepartment: React.Dispatch<React.SetStateAction<Partial<Department>>>;
  onAddDepartment: () => void;
}

const DepartmentAddDialog: React.FC<DepartmentAddDialogProps> = ({
  open,
  onOpenChange,
  newDepartment,
  setNewDepartment,
  onAddDepartment
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>添加学院</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">
              学院名称
            </label>
            <Input
              id="name"
              value={newDepartment.name || ''}
              onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
              className="col-span-3"
              placeholder="请输入学院名称"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="code" className="text-right text-sm font-medium">
              学院代码
            </label>
            <Input
              id="code"
              value={newDepartment.code || ''}
              onChange={(e) => setNewDepartment({ ...newDepartment, code: e.target.value })}
              className="col-span-3"
              placeholder="请输入学院代码"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right text-sm font-medium">
              学院描述
            </label>
            <Textarea
              id="description"
              value={newDepartment.description || ''}
              onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
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
          <Button onClick={onAddDepartment}>
            添加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentAddDialog;