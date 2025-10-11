import React from "react";
import { User } from "lucide-react";

interface ProfileHeaderCardProps {
  name: string;
  studentId: string;
  onEdit?: () => void;
}

const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({
  name,
  studentId,
}) => {
  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md overflow-hidden mb-8">
      <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-[oklch(0.205_0_0)] to-transparent"></div>
        <div className="absolute bottom-[-30px] left-6 w-24 h-24 bg-white dark:bg-gray-800 rounded-full border-4 border-white dark:border-[oklch(0.205_0_0)]">
          <User className="h-12 w-12 text-gray-400 mx-auto mt-6" />
        </div>
      </div>
      <div className="pt-16 px-6 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              学号：{studentId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderCard;
