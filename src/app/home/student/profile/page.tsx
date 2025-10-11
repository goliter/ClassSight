import React from "react";
import StudentNavigation from "@/components/StudentNavigation";
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import ProfileHeaderCard from '@/components/ProfileHeaderCard';
import ProfileDetails from '@/components/ProfileDetails';
import StudyStats from '@/components/StudyStats';

const ProfilePage: React.FC = () => {

  const profileDetails = [
    { label: '姓名', value: '学生姓名' },
    { label: '学号', value: '20230001' },
    { label: '性别', value: '男' },
    { label: '学院', value: '计算机科学与技术学院' },
    { label: '专业', value: '计算机科学与技术' },
    { label: '班级', value: '计算机科学与技术1班' },
    { label: '入学年份', value: '2023年' }
  ];

  const studyStats = [
    { label: '出勤率', value: '98%', color: 'green' },
    { label: '平均专注度', value: '85%', color: 'blue' },
    { label: '参与度评分', value: '92分', color: 'purple' },
    { label: '本学期课程', value: '8门', color: 'amber' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
      {/* 顶部导航 */}
      <PageHeader />

      <StudentNavigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">个人资料</h2>

          {/* 个人信息卡片 */}
          <ProfileHeaderCard 
            name="学生姓名" 
            studentId="20230001" 
          />

          {/* 详细信息 */}
          <ProfileDetails details={profileDetails} />

          {/* 学习数据 */}
          <StudyStats stats={studyStats} />
        </div>
      </main>
      
      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default ProfilePage;
