import React from "react";
import StudentNavigation from "@/components/StudentNavigation";
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import CourseCard from '@/components/CourseCard';

interface Course {
  title: string;
  teacher: string;
  department: string;
  type: string;
  schedule: string;
  bgColor: string;
  id: string;
}

const CoursesPage: React.FC = () => {
  const courses: Course[] = [
    {
      title: 'Web前端开发',
      teacher: '王老师',
      department: '计算机科学与技术学院',
      type: '必修',
      schedule: '每周一 14:00-16:00',
      bgColor: 'bg-blue-500 dark:bg-blue-700',
      id: 'web-frontend'
    },
    {
      title: '高等数学',
      teacher: '李老师',
      department: '数学学院',
      type: '必修',
      schedule: '每周一、三 8:00-10:00',
      bgColor: 'bg-green-500 dark:bg-green-700',
      id: 'advanced-math'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
      {/* 顶部导航 */}
      <PageHeader />
      
      <StudentNavigation role={0} />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">我的课程</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <CourseCard 
              key={course.id}
              title={course.title}
              teacher={course.teacher}
              department={course.department}
              type={course.type}
              schedule={course.schedule}
              bgColor={course.bgColor}
              id={course.id}
              isStudentView={true}
            />
          ))}
        </div>
      </main>
      
      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

export default CoursesPage;
