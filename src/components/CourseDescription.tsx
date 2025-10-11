import React from "react";

interface CourseDescriptionProps {
  description: string;
}

const CourseDescription: React.FC<CourseDescriptionProps> = ({ description }) => {
  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">课程简介</h3>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default CourseDescription;