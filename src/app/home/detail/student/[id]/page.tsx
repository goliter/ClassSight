"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, BookOpen, Building2, GraduationCap, Calendar, Clock, Award, ChevronLeft } from "lucide-react";
import CourseList from "@/components/CourseList";

interface StudentDetailPageProps {
  params: { id: string };
}

// 学生接口定义
interface Student {
  id: string;
  name: string;
  studentId: string;
  departmentId: string;
  departmentName: string;
  major: string;
  grade: string;
  class: string;
  email: string;
  phone: string;
  enrollmentDate: string;
  status: 'active' | 'suspended' | 'graduated';
  courseCount: number;
}

// 课程接口定义
interface Course {
  id: string;
  name: string;
  teacher: string;
  department: string;
  type: string;
  schedule: string;
  bgColor: string;
}

const StudentDetailPage: React.FC<StudentDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const studentId = params.id;

  // 模拟学生数据 - 实际项目中应从API获取
  const getStudentData = (id: string): Student => {
    const students: Student[] = [
      {
        id: '1',
        name: '张三',
        studentId: '20230001',
        departmentId: '1',
        departmentName: '信息科学与技术学院',
        major: '计算机科学与技术',
        grade: '2023',
        class: '计算机1班',
        email: 'zhang.san@example.com',
        phone: '13800138001',
        enrollmentDate: '2023-09-01',
        status: 'active',
        courseCount: 5
      },
      {
        id: '2',
        name: '李四',
        studentId: '20230002',
        departmentId: '1',
        departmentName: '信息科学与技术学院',
        major: '软件工程',
        grade: '2023',
        class: '软件2班',
        email: 'li.si@example.com',
        phone: '13800138002',
        enrollmentDate: '2023-09-01',
        status: 'active',
        courseCount: 6
      },
      {
        id: '3',
        name: '王五',
        studentId: '20220001',
        departmentId: '2',
        departmentName: '人工智能学院',
        major: '人工智能',
        grade: '2022',
        class: '智能1班',
        email: 'wang.wu@example.com',
        phone: '13800138003',
        enrollmentDate: '2022-09-01',
        status: 'active',
        courseCount: 4
      },
      {
        id: '4',
        name: '赵六',
        studentId: '20210001',
        departmentId: '3',
        departmentName: '数学与统计学院',
        major: '应用数学',
        grade: '2021',
        class: '数学1班',
        email: 'zhao.liu@example.com',
        phone: '13800138004',
        enrollmentDate: '2021-09-01',
        status: 'graduated',
        courseCount: 3
      }
    ];

    // 根据ID查找学生
    const student = students.find(s => s.id === id);
    // 如果找不到，返回默认学生
    return student || students[0];
  };

  // 模拟学生课程数据
  const getStudentCourses = (studentId: string): Course[] => {
    // 为不同学生设置不同的课程
    const courseMap: Record<string, Course[]> = {
      '1': [
        {
          id: 'c1',
          name: '高等数学',
          teacher: '李教授',
          department: '数学与统计学院',
          type: '必修课',
          schedule: '周一 08:00-10:00',
          bgColor: 'bg-blue-500 dark:bg-blue-700'
        },
        {
          id: 'c2',
          name: '大学英语',
          teacher: '王教授',
          department: '外国语学院',
          type: '必修课',
          schedule: '周二 10:00-12:00',
          bgColor: 'bg-green-500 dark:bg-green-700'
        },
        {
          id: 'c3',
          name: '计算机基础',
          teacher: '张教授',
          department: '信息科学与技术学院',
          type: '必修课',
          schedule: '周三 14:00-16:00',
          bgColor: 'bg-purple-500 dark:bg-purple-700'
        },
        {
          id: 'c4',
          name: '程序设计基础',
          teacher: '刘教授',
          department: '信息科学与技术学院',
          type: '必修课',
          schedule: '周四 09:00-11:00',
          bgColor: 'bg-amber-500 dark:bg-amber-700'
        },
        {
          id: 'c5',
          name: '线性代数',
          teacher: '陈教授',
          department: '数学与统计学院',
          type: '必修课',
          schedule: '周五 13:30-15:30',
          bgColor: 'bg-pink-500 dark:bg-pink-700'
        }
      ],
      '2': [
        {
          id: 'c6',
          name: '高等数学',
          teacher: '李教授',
          department: '数学与统计学院',
          type: '必修课',
          schedule: '周一 08:00-10:00',
          bgColor: 'bg-blue-500 dark:bg-blue-700'
        },
        {
          id: 'c7',
          name: '大学英语',
          teacher: '王教授',
          department: '外国语学院',
          type: '必修课',
          schedule: '周二 10:00-12:00',
          bgColor: 'bg-green-500 dark:bg-green-700'
        },
        {
          id: 'c8',
          name: '软件工程导论',
          teacher: '张教授',
          department: '信息科学与技术学院',
          type: '必修课',
          schedule: '周三 14:00-16:00',
          bgColor: 'bg-purple-500 dark:bg-purple-700'
        },
        {
          id: 'c9',
          name: '数据结构',
          teacher: '刘教授',
          department: '信息科学与技术学院',
          type: '必修课',
          schedule: '周四 09:00-11:00',
          bgColor: 'bg-amber-500 dark:bg-amber-700'
        },
        {
          id: 'c10',
          name: '离散数学',
          teacher: '陈教授',
          department: '数学与统计学院',
          type: '必修课',
          schedule: '周五 13:30-15:30',
          bgColor: 'bg-pink-500 dark:bg-pink-700'
        },
        {
          id: 'c11',
          name: '算法分析',
          teacher: '周教授',
          department: '信息科学与技术学院',
          type: '必修课',
          schedule: '周五 16:00-18:00',
          bgColor: 'bg-indigo-500 dark:bg-indigo-700'
        }
      ],
      '3': [
        {
          id: 'c12',
          name: '人工智能基础',
          teacher: '李教授',
          department: '人工智能学院',
          type: '必修课',
          schedule: '周一 08:00-10:00',
          bgColor: 'bg-blue-500 dark:bg-blue-700'
        },
        {
          id: 'c13',
          name: '机器学习',
          teacher: '王教授',
          department: '人工智能学院',
          type: '必修课',
          schedule: '周二 10:00-12:00',
          bgColor: 'bg-green-500 dark:bg-green-700'
        },
        {
          id: 'c14',
          name: '深度学习',
          teacher: '张教授',
          department: '人工智能学院',
          type: '必修课',
          schedule: '周三 14:00-16:00',
          bgColor: 'bg-purple-500 dark:bg-purple-700'
        },
        {
          id: 'c15',
          name: '神经网络',
          teacher: '刘教授',
          department: '人工智能学院',
          type: '必修课',
          schedule: '周四 09:00-11:00',
          bgColor: 'bg-amber-500 dark:bg-amber-700'
        }
      ],
      '4': [
        {
          id: 'c16',
          name: '数学分析',
          teacher: '李教授',
          department: '数学与统计学院',
          type: '必修课',
          schedule: '周一 08:00-10:00',
          bgColor: 'bg-blue-500 dark:bg-blue-700'
        },
        {
          id: 'c17',
          name: '概率论',
          teacher: '王教授',
          department: '数学与统计学院',
          type: '必修课',
          schedule: '周二 10:00-12:00',
          bgColor: 'bg-green-500 dark:bg-green-700'
        },
        {
          id: 'c18',
          name: '统计学',
          teacher: '张教授',
          department: '数学与统计学院',
          type: '必修课',
          schedule: '周三 14:00-16:00',
          bgColor: 'bg-purple-500 dark:bg-purple-700'
        }
      ]
    };

    // 返回对应学生的课程，如果没有则返回默认课程
    return courseMap[studentId] || courseMap['1'];
  };

  const studentData = getStudentData(studentId);
  const studentCourses = getStudentCourses(studentId);

  const handleBack = () => {
    router.back();
  };

  // 获取状态对应的文本和样式
  const getStatusInfo = (status: string) => {
    const statusMap = {
      active: { text: '在读', bgColor: 'bg-green-100 dark:bg-green-900/30', textColor: 'text-green-800 dark:text-green-300' },
      suspended: { text: '休学', bgColor: 'bg-amber-100 dark:bg-amber-900/30', textColor: 'text-amber-800 dark:text-amber-300' },
      graduated: { text: '毕业', bgColor: 'bg-blue-100 dark:bg-blue-900/30', textColor: 'text-blue-800 dark:text-blue-300' }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.active;
  };

  const statusInfo = getStatusInfo(studentData.status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 返回按钮 */}
        <button
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 transition-colors"
          onClick={handleBack}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="font-medium">返回列表</span>
        </button>

        {/* 学生信息卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl">
          {/* 学生基本信息 */}
          <div className="px-6 pb-6 mt-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* 头像 */}
              <div className="w-32 h-32 bg-white dark:bg-gray-700 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                <User className="h-16 w-16 text-gray-400 dark:text-gray-500" />
              </div>
              
              {/* 姓名和状态 */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{studentData.name}</h1>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                    {statusInfo.text}
                  </span>
                </div>
                <p className="text-lg text-gray-500 dark:text-gray-400">学号：{studentData.studentId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 详细信息卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 基本信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              基本信息
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">姓名</div>
                <div className="col-span-2 font-medium">{studentData.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">学号</div>
                <div className="col-span-2 font-medium">{studentData.studentId}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">邮箱</div>
                <div className="col-span-2 font-medium flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-500" />
                  {studentData.email}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">电话</div>
                <div className="col-span-2 font-medium flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-blue-500" />
                  {studentData.phone}
                </div>
              </div>
            </div>
          </div>

          {/* 学籍信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-purple-500" />
              学籍信息
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">学院</div>
                <div className="col-span-2 font-medium flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-purple-500" />
                  {studentData.departmentName}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">专业</div>
                <div className="col-span-2 font-medium">{studentData.major}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">年级</div>
                <div className="col-span-2 font-medium">{studentData.grade}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-gray-500 dark:text-gray-400">班级</div>
                <div className="col-span-2 font-medium">{studentData.class}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 其他信息卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-green-500" />
            其他信息
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-500 mb-2" />
              <div className="text-sm text-gray-500 dark:text-gray-400">入学日期</div>
              <div className="font-medium mt-1">{studentData.enrollmentDate}</div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Award className="h-6 w-6 text-purple-500 mb-2" />
              <div className="text-sm text-gray-500 dark:text-gray-400">当前状态</div>
              <div className={`font-medium mt-1 ${statusInfo.textColor}`}>{statusInfo.text}</div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Clock className="h-6 w-6 text-green-500 mb-2" />
              <div className="text-sm text-gray-500 dark:text-gray-400">当前课程</div>
              <div className="font-medium mt-1">{studentData.courseCount}门</div>
            </div>
          </div>
        </div>

        {/* 课程列表展示 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-blue-500" />
              正在修读的课程
            </h2>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <CourseList 
              courses={studentCourses}
              isStudentView={true} // 设置为学生视图，即为只读模式
            />
          </div>
        </div>

        {/* 页脚 */}
        <div className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} 学生信息管理系统</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;