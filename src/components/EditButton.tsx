import React from 'react';

interface EditButtonProps {
  isEditing: boolean;
  onToggleEdit: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ isEditing, onToggleEdit }) => {
  return (
    <div className="flex justify-end">
      <button 
        onClick={onToggleEdit}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center"
      >
        {isEditing ? '保存' : '编辑资料'}
      </button>
    </div>
  );
};

export default EditButton;