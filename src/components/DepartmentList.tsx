import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import AdminBadge from './AdminBadge';

// 学院接口定义
export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  adminIds: string[];
  adminNames: string[];
  studentCount: number;
  teacherCount: number;
  courseCount: number;
}

interface DepartmentListProps {
  departments: Department[];
  selectedDepartment: Department | null;
  isDeleteDialogOpen: boolean;
  onOpenEditDialog: (department: Department) => void;
  onOpenDeleteDialog: (department: Department) => void;
  onDeleteDepartment: () => void;
  onSetDeleteDialogOpen: (open: boolean) => void;
}

const DepartmentList: React.FC<DepartmentListProps> = ({
  departments,
  selectedDepartment,
  isDeleteDialogOpen,
  onOpenEditDialog,
  onOpenDeleteDialog,
  onDeleteDepartment,
  onSetDeleteDialogOpen
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>学院列表</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 text-left font-semibold">学院名称</th>
                <th className="py-3 text-left font-semibold">学院代码</th>
                <th className="py-3 text-left font-semibold">学院管理员</th>
                <th className="py-3 text-left font-semibold">学生人数</th>
                <th className="py-3 text-left font-semibold">教师人数</th>
                <th className="py-3 text-left font-semibold">课程数量</th>
                <th className="py-3 text-left font-semibold">操作</th>
              </tr>
            </thead>
            <tbody>
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <tr
                    key={dept.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-4">
                      <div className="font-medium">{dept.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{dept.description}</div>
                    </td>
                    <td className="py-4">{dept.code}</td>
                    <td className="py-4">
                      {dept.adminNames.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {dept.adminIds.map((adminId, index) => (
                            <AdminBadge
                              key={adminId}
                              adminId={adminId}
                              adminName={dept.adminNames[index]}
                              readOnly={true}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">暂无管理员</span>
                      )}
                    </td>
                    <td className="py-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                        {dept.studentCount}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        {dept.teacherCount}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                        {dept.courseCount}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onOpenEditDialog(dept)}
                          className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog open={isDeleteDialogOpen && selectedDepartment?.id === dept.id} onOpenChange={onSetDeleteDialogOpen}>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>确认删除</AlertDialogTitle>
                              <AlertDialogDescription>
                                您确定要删除学院「{dept.name}」吗？此操作无法撤销。
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>取消</AlertDialogCancel>
                              <AlertDialogAction onClick={onDeleteDepartment} className="bg-red-600 hover:bg-red-700">
                                删除
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-gray-500 dark:text-gray-400">
                    没有找到符合条件的学院
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentList;