/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, BookOpen, Users, Calendar, PieChart, BarChart2, Award, Clock, Check, X, AlertCircle, TrendingUp, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, ScatterChart, Scatter, ZAxis, Line, LineChart }
 from 'recharts';

// 定义学生表现接口
interface StudentPerformance {
  id: string;
  name: string;
  avatar: string;
  attendanceRate: number;
  lookUpRate: number;
  focusLevel: number;
  participationCount: number;
  score: number;
  rank: number;
}

// 定义课程接口
interface Course {
  id: string;
  name: string;
  code: string;
  teacher: { name: string; avatar: string };
  semester: string;
  department: string;
  classroom: string;
  schedule: string;
  totalStudents: number;
  credits: number;
}

const CoursePerformancePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [studentPerformances, setStudentPerformances] = useState<StudentPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [classStats, setClassStats] = useState({
    avgAttendance: 0,
    avgLookUpRate: 0,
    avgFocusLevel: 0,
    avgParticipationCount: 0
  });

  // 模拟获取课程数据
  const getCourseData = (id: string): Promise<Course> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: '数据结构',
          code: 'CS201',
          teacher: { name: '张教授', avatar: '/image/nefu.png' },
          semester: '2023-2024学年第一学期',
          department: '计算机科学与技术',
          classroom: '丹青楼416',
          schedule: '周一 10:00-12:00, 周三 14:00-16:00',
          totalStudents: 45,
          credits: 3
        });
      }, 500);
    });
  };

  // 生成模拟学生表现数据
  const generateStudentPerformances = (count: number): StudentPerformance[] => {
    const performances: StudentPerformance[] = [];
    
    for (let i = 1; i <= count; i++) {
      const lookUpRate = Math.floor(Math.random() * 30) + 60; // 60-90%
      const focusLevel = Math.floor(Math.random() * 30) + 65; // 65-95%
      
      // 修改为：使发言次数与专注度成正比，控制在0-5范围内
      // 专注度65-95%映射到0-5次发言
      const participationCount = Math.round((focusLevel - 65) / 6); // 65-70%:0, 71-76%:1, ..., 90-95%:5
      
      const attendanceRate = Math.floor(Math.random() * 15) + 80; // 80-95%
      
      // 修改为仅基于前三个数据（出勤率、抬头率、专注度）计算分数
      // 调整权重：出勤率30%，抬头率40%，专注度30%
      const score = Math.floor(attendanceRate * 0.3 + lookUpRate * 0.4 + focusLevel * 0.3);
      
      performances.push({
        id: `student-${i}`,
        name: `学生${i}`,
        avatar: `/image/nefu.png`,
        attendanceRate,
        lookUpRate,
        focusLevel,
        participationCount,
        score,
        rank: 0 // 后面会计算排名
      });
    }
    
    // 计算排名
    performances.sort((a, b) => b.score - a.score);
    return performances.map((p, index) => ({ ...p, rank: index + 1 }));
  };

  // 计算班级统计数据
  const calculateClassStats = (performances: StudentPerformance[]) => {
    if (performances.length === 0) return;
    
    const totalAttendance = performances.reduce((sum, p) => sum + p.attendanceRate, 0);
    const totalLookUpRate = performances.reduce((sum, p) => sum + p.lookUpRate, 0);
    const totalFocusLevel = performances.reduce((sum, p) => sum + p.focusLevel, 0);
    const totalParticipation = performances.reduce((sum, p) => sum + p.participationCount, 0);
    
    setClassStats({
      avgAttendance: Math.round(totalAttendance / performances.length),
      avgLookUpRate: Math.round(totalLookUpRate / performances.length),
      avgFocusLevel: Math.round(totalFocusLevel / performances.length),
      avgParticipationCount: Math.round(totalParticipation / performances.length)
    });
  };

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const courseData = await getCourseData(courseId);
        setCourse(courseData);
        
        const performances = generateStudentPerformances(courseData.totalStudents);
        setStudentPerformances(performances);
        calculateClassStats(performances);
        setError(null);
      } catch (err) {
        setError('加载课程表现数据失败');
        console.error('Error loading course performance data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadData();
    }
  }, [courseId]);

  // 处理返回
  const handleBack = () => {
    router.back();
  };

  // 查看单个学生表现
  const viewStudentPerformance = (studentId: string) => {
    router.push(`/home/performance/student/${studentId}`);
  };

  // 准备抬头率分布数据
  const lookUpRateDistributionData = [
    { name: '60-69%', value: 5 },
    { name: '70-79%', value: 12 },
    { name: '80-89%', value: 18 },
    { name: '90-100%', value: 10 }
  ];

  // 准备专注度与发言次数关系数据（用于折线图）
  const focusParticipationData = React.useMemo(() => {
    // 先按专注度排序，然后分组统计平均发言次数
    const sortedStudents = [...studentPerformances].sort((a, b) => a.focusLevel - b.focusLevel);
    
    // 按专注度区间分组
    const groupedData: Record<number, { count: number; totalParticipation: number }> = {};
    
    sortedStudents.forEach(student => {
      // 按5%的区间进行分组
      const range = Math.floor(student.focusLevel / 5) * 5;
      if (!groupedData[range]) {
        groupedData[range] = { count: 0, totalParticipation: 0 };
      }
      groupedData[range].count++;
      groupedData[range].totalParticipation += student.participationCount;
    });
    
    // 计算每个区间的平均发言次数
    return Object.entries(groupedData).map(([range, data]) => ({
      专注度区间: `${range}%`,
      专注度值: parseInt(range),
      平均发言次数: Math.round(data.totalParticipation / data.count)
    }));
  }, [studentPerformances]);

  // 饼图颜色
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="text-gray-500 hover:text-gray-700">
            <ChevronLeft size={20} />
          </button>
          <h1 className="ml-2 text-xl font-bold text-gray-900">加载中...</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 animate-pulse">加载课程表现数据...</div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="text-gray-500 hover:text-gray-700">
            <ChevronLeft size={20} />
          </button>
          <h1 className="ml-2 text-xl font-bold text-gray-900">课程表现</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-500">
            <AlertCircle className="mx-auto h-12 w-12" />
            <p className="mt-2 text-center">{error || '未找到课程信息'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      {/* 页面头部 */}
      <div className="mb-6 flex items-center">
        <button
          onClick={handleBack}
          className="rounded-full p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="ml-2 text-2xl font-bold text-gray-900">课程表现分析</h1>
      </div>

      {/* 课程信息卡片 */}
      <Card className="mb-6 overflow-hidden bg-white shadow">
        <div className="p-6">
          <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center">
                <Badge variant="secondary" className="mr-2 bg-blue-100 text-blue-800">
                  {course.code}
                </Badge>
                <h2 className="text-xl font-bold text-gray-900">{course.name}</h2>
              </div>
              <p className="mt-1 text-sm text-gray-500">{course.semester}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center text-sm text-gray-500">
                <Users size={16} className="mr-1" />
                <span>{course.totalStudents} 名学生</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Award size={16} className="mr-1" />
                <span>{course.credits} 学分</span>
              </div>
            </div>
          </div>
          
          <Separator className="my-4 bg-gray-200" />
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                <BookOpen size={20} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">任课教师</p>
                <p className="text-sm text-gray-500">{course.teacher.name}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500">
                <MapPin size={20} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">上课地点</p>
                <p className="text-sm text-gray-500">{course.classroom}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500">
                <Calendar size={20} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">上课时间</p>
                <p className="text-sm text-gray-500">{course.schedule}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-500">
                <TrendingUp size={20} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">所属学院</p>
                <p className="text-sm text-gray-500">{course.department}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 班级整体表现统计 */}
      <Card className="mb-6 bg-white shadow">
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">班级整体表现</h2>
            <Badge variant="outline" className="text-sm font-medium">
              平均值
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-800">出勤率</p>
              <p className="mt-1 text-2xl font-bold text-blue-900">{classStats.avgAttendance}%</p>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-sm font-medium text-green-800">抬头率</p>
              <p className="mt-1 text-2xl font-bold text-green-900">{classStats.avgLookUpRate}%</p>
            </div>
            <div className="rounded-lg bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-800">专注度</p>
              <p className="mt-1 text-2xl font-bold text-amber-900">{classStats.avgFocusLevel}%</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4">
              <p className="text-sm font-medium text-purple-800">发言次数</p>
              <p className="mt-1 text-2xl font-bold text-purple-900">{classStats.avgParticipationCount}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* 数据图表 */}
      <div className="mb-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {/* 抬头率分布图表 */}
        <Card className="bg-white shadow">
          <div className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">出勤率分布</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={lookUpRateDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {lookUpRateDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} 人`, '学生数量']} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* 专注度与发言次数关系图表 */}
        <Card className="bg-white shadow">
          <div className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">专注度与发言次数关系</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={focusParticipationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="专注度值" 
                    name="专注度" 
                    unit="%" 
                    domain={[50, 100]} 
                    label={{ value: '专注度 (%)', position: 'insideBottomRight', offset: -10 }}
                  />
                  <YAxis 
                    domain={[0, 5]} 
                    label={{ value: '平均发言次数', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value, name, props) => [value, name === '平均发言次数' ? '平均发言次数' : '专注度']}
                    labelFormatter={(label) => `专注度: ${label}%`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="平均发言次数" 
                    stroke="#8884d8" 
                    strokeWidth={2} 
                    dot={{ r: 6 }} 
                    activeDot={{ r: 8 }} 
                    name="平均发言次数"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* 学生表现详情表格 */}
      <Card className="bg-white shadow">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">学生表现详情</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">排名</TableHead>
                  <TableHead>学生</TableHead>
                  <TableHead>出勤率</TableHead>
                  <TableHead>抬头率</TableHead>
                  <TableHead>专注度</TableHead>
                  <TableHead>发言次数</TableHead>
                  <TableHead>总分</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentPerformances.map((student) => (
                  <TableRow key={student.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell>
                      <Badge variant={
                        student.rank === 1 ? "default" :
                        student.rank <= 3 ? "secondary" : "outline"
                      } className={
                        student.rank === 1 ? "bg-amber-100 text-amber-800" :
                        student.rank <= 3 ? "bg-blue-100 text-blue-800" : ""
                      }>
                        {student.rank}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium" onClick={() => viewStudentPerformance(student.id)}>
                      <div className="flex items-center gap-2">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <span>{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${student.attendanceRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{student.attendanceRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${student.lookUpRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{student.lookUpRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-purple-500"
                            style={{ width: `${student.focusLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{student.focusLevel}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.participationCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-bold ${student.score >= 80 ? 'text-green-600' : student.score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                          {student.score}
                        </span>
                        <span className="text-xs text-gray-500">/100</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      {/* 页脚 */}
      <footer className="mt-auto py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} 课程表现分析系统 - 数据仅供参考</p>
      </footer>
    </div>
  );
};

export default CoursePerformancePage;