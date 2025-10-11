import React from "react";
import StudentNavigation from "@/components/StudentNavigation";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import { Users, GraduationCap, BookOpen, BarChart2, Building } from "lucide-react";

// 管理员信息接口
interface AdminInfo {
  name: string;
  adminId: string;
  department: string;
  role: string;
}

// 统计数据接口
interface StatsData {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalDepartments: number;
}

const AdminHomePage: React.FC = () => {
  // 模拟管理员信息数据
  const adminInfo: AdminInfo = {
    name: "张管理员",
    adminId: "AD10001",
    department: "信息科学与技术学院",
    role: "系统管理员"
  };

  // 模拟统计数据
  const statsData: StatsData = {
    totalStudents: 2450,
    totalTeachers: 186,
    totalCourses: 324,
    totalDepartments: 12
  };

  // 模拟各部门学生数量数据
  const departmentStudentData = [
    { name: "计算机科学", students: 450 },
    { name: "软件工程", students: 380 },
    { name: "数据科学", students: 290 },
    { name: "人工智能", students: 320 },
    { name: "网络工程", students: 280 },
    { name: "其他院系", students: 730 }
  ];

  // 模拟近期活动数据
  const recentActivities = [
    { id: 1, description: "新增学生账号 15 个", time: "今天 10:30" },
    { id: 2, description: "开设新课程《人工智能导论》", time: "昨天 14:15" },
    { id: 3, description: "添加教师 3 名", time: "2023-11-15 09:45" },
    { id: 4, description: "系统维护更新", time: "2023-11-12 18:00" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[oklch(0.145_0_0)] text-gray-900 dark:text-white">
      {/* 顶部导航 */}
      <PageHeader 
        title="ClassSight 管理系统"
        welcomeText={`欢迎，${adminInfo.name} (${adminInfo.role})`}
      />

      {/* 导航菜单 */}
      <StudentNavigation role={2} />

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 左侧面板 - 管理员信息卡片 */}
          <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">管理员信息</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{adminInfo.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{adminInfo.adminId}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Building className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">部门</span>
                </div>
                <p className="ml-6 font-medium">{adminInfo.department}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">角色</span>
                </div>
                <p className="ml-6 font-medium">{adminInfo.role}</p>
              </div>
            </div>
          </div>

          {/* 中间和右侧面板 - 统计数据和信息 */}
          <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-bold mb-6">学院整体情况</h2>
            
            {/* 统计卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">总学生数</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{statsData.totalStudents}</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <User className="h-5 w-5 text-green-500 dark:text-green-400" />
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">总教师数</h3>
                </div>
                <p className="text-3xl font-bold text-green-600 dark:text-green-300">{statsData.totalTeachers}</p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <BookOpen className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">总课程数</h3>
                </div>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">{statsData.totalCourses}</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Building className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">总部门数</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-300">{statsData.totalDepartments}</p>
              </div>
            </div>

            {/* 部门学生分布 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">各部门学生分布</h3>
              <div className="space-y-3">
                {departmentStudentData.map((dept, index) => {
                  const percentage = (dept.students / statsData.totalStudents) * 100;
                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{dept.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{dept.students} 人</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 近期活动 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">近期系统活动</h3>
              <div className="space-y-3">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="min-w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <PageFooter />
    </div>
  );
};

// 添加缺少的User组件导入
const User = GraduationCap;

export default AdminHomePage;