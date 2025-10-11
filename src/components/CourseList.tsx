import React from 'react';
import CourseCard from './CourseCard';

interface Course {
  id: string;
  name: string;
  teacher: string;
  department: string;
  type: string;
  schedule: string;
  bgColor: string;
}

interface CourseListProps {
  courses: Course[];
  isStudentView?: boolean;
}

const CourseList: React.FC<CourseListProps> = ({ 
  courses, 
  isStudentView = false 
}) => {
  // 根据视图类型决定网格布局
  const gridClass = isStudentView 
    ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
  
  return (
    <div className={gridClass}>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          title={course.name}
          teacher={course.teacher}
          department={course.department}
          type={course.type}
          schedule={course.schedule}
          bgColor={course.bgColor}
          id={course.id}
          isStudentView={isStudentView}
        />
      ))}
    </div>
  );
};

export default CourseList;