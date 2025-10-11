import React from 'react';

interface PageHeaderProps {
  title?: string;
  welcomeText?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title = 'ClassSight',
  welcomeText = '欢迎，学生用户'
}) => {
  return (
    <header className="bg-white dark:bg-[oklch(0.205_0_0)] shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="text-sm">
          {welcomeText}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;