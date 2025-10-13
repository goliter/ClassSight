import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Plus } from 'lucide-react';

interface SearchBarProps<T> {
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onAddClick: () => void;
  addButtonText: string;
  additionalContent?: React.ReactNode;
}

/**
 * 通用搜索栏组件
 * 用于显示搜索框和添加按钮
 */
  const SearchBar: React.FC<SearchBarProps<unknown>> = ({
  searchTerm,
  onSearch,
  placeholder,
  onAddClick,
  addButtonText,
  additionalContent
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={onSearch}
          className="pl-10"
        />
      </div>
      {additionalContent && (
        <div className="w-full sm:w-auto">
          {additionalContent}
        </div>
      )}
      <Button
        onClick={onAddClick}
        className="w-full sm:w-auto"
      >
        <Plus className="mr-2 h-4 w-4" />
        {addButtonText}
      </Button>
    </div>
  );
};

export default SearchBar;