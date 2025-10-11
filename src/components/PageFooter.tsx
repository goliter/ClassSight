import React from 'react';

interface PageFooterProps {
  copyrightText?: string;
}

const PageFooter: React.FC<PageFooterProps> = ({
  copyrightText = `© ${new Date().getFullYear()} ClassSight 课堂行为洞察系统`
}) => {
  return (
    <footer className="bg-white dark:bg-[oklch(0.205_0_0)] shadow-inner mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>{copyrightText}</p>
      </div>
    </footer>
  );
};

export default PageFooter;