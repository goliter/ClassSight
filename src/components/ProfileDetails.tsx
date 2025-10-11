import React from 'react';

interface ProfileDetailsProps {
  details: {
    label: string;
    value: string;
  }[];
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ details }) => {
  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">详细信息</h3>
      <div className="space-y-4">
        {details.map((detail, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-3 gap-4 pb-4 ${index < details.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
          >
            <div className="col-span-1 text-gray-500 dark:text-gray-400">
              {detail.label}
            </div>
            <div className="col-span-2">{detail.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetails;