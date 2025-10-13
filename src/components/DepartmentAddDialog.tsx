import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import AdminBadge from './AdminBadge';

interface Admin {
  id: string;
  name: string;
  role: string;
}

interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  adminIds: string[];
  teacherCount: number;
  studentCount: number;
}

interface DepartmentAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newDepartment: Partial<Department>;
  setNewDepartment: React.Dispatch<React.SetStateAction<Partial<Department>>>;
  admins: Admin[];
  onAddAdmin: (adminId: string) => void;
  onRemoveAdmin: (adminId: string) => void;
  onAddDepartment: () => void;
}

const DepartmentAddDialog: React.FC<DepartmentAddDialogProps> = ({
  open,
  onOpenChange,
  newDepartment,
  setNewDepartment,
  admins,
  onAddAdmin,
  onRemoveAdmin,
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
          <div className="grid grid-cols-4 items-start gap-4">
            <label className="text-right text-sm font-medium pt-2">
              学院管理员
            </label>
            <div className="col-span-3">
              <div className="flex flex-wrap gap-2 mb-2">
                {(newDepartment.adminIds || []).map((adminId) => {
                  const admin = admins.find(a => a.id === adminId);
                  return admin ? (
                    <AdminBadge
                      key={adminId}
                      adminId={adminId}
                      adminName={admin.name}
                      onRemove={() => onRemoveAdmin(adminId)}
                      readOnly={false}
                    />
                  ) : null;
                })}
              </div>
              <Select onValueChange={onAddAdmin}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="添加学院管理员" />
                </SelectTrigger>
                <SelectContent>
                  {admins
                    .filter(admin => !(newDepartment.adminIds || []).includes(admin.id))
                    .map((admin) => (
                      <SelectItem key={admin.id} value={admin.id}>
                        {admin.name} ({admin.role})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
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