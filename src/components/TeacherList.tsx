import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import StatusBadge from './StatusBadge';
import RankBadge from './RankBadge';

// 教师接口定义
interface Teacher {
  name: string;
  teacherId: string;
  departmentId: string;
  departmentName: string;
  rank: string;
  email: string;
  phone: string;
  office: string;
  hireDate: string;
  status: 'active' | 'onLeave' | 'resigned';
  courseCount: number;
  studentCount: number;
}

interface TeacherListProps {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  isDeleteDialogOpen: boolean;
  onOpenEditDialog: (teacher: Teacher) => void;
  onOpenDeleteDialog: (teacher: Teacher) => void;
  onDeleteTeacher: () => void;
  onSetDeleteDialogOpen: (open: boolean) => void;
}

const TeacherList: React.FC<TeacherListProps> = ({
  teachers,
  selectedTeacher,
  isDeleteDialogOpen,
  onOpenEditDialog,
  onOpenDeleteDialog,
  onDeleteTeacher,
  onSetDeleteDialogOpen
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>教师列表</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 text-left font-semibold">姓名</th>
                <th className="py-3 text-left font-semibold">工号</th>
                <th className="py-3 text-left font-semibold">所属学院</th>
                <th className="py-3 text-left font-semibold">职称</th>
                <th className="py-3 text-left font-semibold">邮箱</th>
                <th className="py-3 text-left font-semibold">电话</th>
                <th className="py-3 text-left font-semibold">办公室</th>
                <th className="py-3 text-left font-semibold">状态</th>
                <th className="py-3 text-left font-semibold">操作</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <tr
                    key={teacher.teacherId}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-4 font-medium">{teacher.name}</td>
                    <td className="py-4">{teacher.teacherId}</td>
                    <td className="py-4">{teacher.departmentName}</td>
                    <td className="py-4">
                      <RankBadge rank={teacher.rank} />
                    </td>
                    <td className="py-4">
                      <a
                        href={`mailto:${teacher.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {teacher.email}
                      </a>
                    </td>
                    <td className="py-4">{teacher.phone}</td>
                    <td className="py-4">{teacher.office}</td>
                    <td className="py-4">
                      <StatusBadge status={teacher.status} type="teacher" />
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onOpenEditDialog(teacher)}
                          className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog open={isDeleteDialogOpen && selectedTeacher?.teacherId === teacher.teacherId} onOpenChange={(open) => {
                          if (open) {
                            onOpenDeleteDialog(teacher);
                          } else {
                            onSetDeleteDialogOpen(false);
                          }
                        }}>
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
                                您确定要删除教师「{teacher.name}」吗？此操作无法撤销。
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>取消</AlertDialogCancel>
                              <AlertDialogAction onClick={onDeleteTeacher} className="bg-red-600 hover:bg-red-700">
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
                  <td
                    colSpan={9}
                    className="py-10 text-center text-gray-500 dark:text-gray-400"
                  >
                    没有找到符合条件的教师
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

export default TeacherList;