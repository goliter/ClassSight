/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Badge } from './ui/badge';
import { Edit, Trash2 } from 'lucide-react';

interface ColumnDefinition<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T extends { id: string | number }> {
  title: string;
  data: T[];
  columns: ColumnDefinition<T>[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: T | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<T | null>>;
  emptyStateText?: string;
  getStatusBadge?: (status: string) => React.ReactNode;
}

/**
 * 通用数据表格组件
 * 用于显示数据列表，支持编辑和删除操作
 */
const DataTable: React.FC<DataTableProps<any>> = ({
  title,
  data,
  columns,
  onEdit,
  onDelete,
  deleteDialogOpen,
  setDeleteDialogOpen,
  selectedItem,
  setSelectedItem,
  emptyStateText = '没有找到符合条件的记录',
  getStatusBadge
}) => {
  const handleEdit = (item: any) => {
    setSelectedItem(item);
    onEdit(item);
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const renderCell = (item: any, accessor: keyof any | ((item: any) => React.ReactNode)) => {
    if (typeof accessor === 'function') {
      return accessor(item);
    }
    
    // 特殊处理状态字段
    if (accessor === 'status' && getStatusBadge) {
      return getStatusBadge(item[accessor]);
    }
    
    return item[accessor];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                {columns.map((column, index) => (
                  <th key={index} className={`py-3 text-left font-semibold ${column.className || ''}`}>
                    {column.header}
                  </th>
                ))}
                <th className="py-3 text-left font-semibold">操作</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    {columns.map((column, index) => (
                      <td key={index} className={`py-4 ${column.className || ''}`}>
                        {renderCell(item, column.accessor)}
                      </td>
                    ))}
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item)}
                          className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="py-10 text-center text-gray-500 dark:text-gray-400"
                  >
                    {emptyStateText}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
      
      {/* 删除确认弹窗 */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除此记录吗？此操作不可撤销，删除后相关数据将丢失。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedItem(null)}>取消</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700" 
              onClick={() => {
                if (selectedItem) {
                  onDelete(selectedItem);
                }
              }}
            >
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default DataTable;