/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export default prisma;

// 学生相关操作
export const studentOperations = {
  // 创建学生
  create: async (data: any) => {
    return await prisma.student.create({ data });
  },

  // 根据ID查找学生
  findById: async (studentId: string) => {
    return await prisma.student.findUnique({
      where: { studentId },
      include: {
        department: true,
        major: true,
        courseEnrollments: {
          include: { course: true }
        }
      }
    });
  },

  // 更新学生信息
  update: async (studentId: string, data: any) => {
    return await prisma.student.update({
      where: { studentId },
      data
    });
  },

  // 删除学生
  delete: async (studentId: string) => {
    return await prisma.student.delete({
      where: { studentId }
    });
  },

  // 获取所有学生
  findAll: async (params?: { skip?: number; take?: number; where?: any }) => {
    return await prisma.student.findMany({
      ...params,
      include: {
        department: true,
        major: true
      }
    });
  },

  // 统计学生数量
  count: async (where?: any) => {
    return await prisma.student.count({ where });
  },

  // 统计所有学生人数
  countAllStudents: async () => {
    return await prisma.student.count();
  }
};

// 老师相关操作
export const teacherOperations = {
  // 创建老师
  create: async (data: any) => {
    return await prisma.teacher.create({ data });
  },

  // 根据ID查找老师
  findById: async (teacherId: string) => {
    return await prisma.teacher.findUnique({
      where: { teacherId },
      include: {
        department: true,
        majors: true,
        courses: true
      }
    });
  },

  // 更新老师信息
  update: async (teacherId: string, data: any) => {
    return await prisma.teacher.update({
      where: { teacherId },
      data
    });
  },

  // 删除老师
  delete: async (teacherId: string) => {
    return await prisma.teacher.delete({
      where: { teacherId }
    });
  },

  // 获取所有老师
  findAll: async (params?: { skip?: number; take?: number; where?: any }) => {
    return await prisma.teacher.findMany({
      ...params,
      include: {
        department: true,
        majors: true
      }
    });
  },

  // 统计老师数量
  count: async (where?: any) => {
    return await prisma.teacher.count({ where });
  }
};

// 管理员相关操作
export const adminOperations = {
  // 创建管理员
  create: async (data: any) => {
    return await prisma.admin.create({ data });
  },

  // 根据ID查找管理员
  findById: async (adminId: string) => {
    return await prisma.admin.findUnique({
      where: { adminId }
    });
  },

  // 更新管理员信息
  update: async (adminId: string, data: any) => {
    return await prisma.admin.update({
      where: { adminId },
      data
    });
  },

  // 删除管理员
  delete: async (adminId: string) => {
    return await prisma.admin.delete({
      where: { adminId }
    });
  },

  // 获取所有管理员
  findAll: async (params?: { skip?: number; take?: number; where?: any }) => {
    return await prisma.admin.findMany(params);
  },

  // 统计管理员数量
  count: async (where?: any) => {
    return await prisma.admin.count({ where });
  }
};

// 学院相关操作
export const departmentOperations = {
  // 创建学院
  create: async (data: any) => {
    return await prisma.department.create({ data });
  },

  // 根据ID查找学院
  findById: async (id: string) => {
    return await prisma.department.findUnique({
      where: { id },
      include: {
        students: true,
        teachers: true,
        courses: true,
        majors: true
      }
    });
  },

  // 更新学院信息
  update: async (id: string, data: any) => {
    return await prisma.department.update({
      where: { id },
      data
    });
  },

  // 删除学院
  delete: async (id: string) => {
    return await prisma.department.delete({
      where: { id }
    });
  },

  // 获取所有学院
  findAll: async (params?: { skip?: number; take?: number; where?: any }) => {
    return await prisma.department.findMany({
      ...params,
      include: {
        students: true,
        teachers: true,
        courses: true,
        majors: true
      }
    });
  },

  // 统计学院数量
  count: async (where?: any) => {
    return await prisma.department.count({ where });
  },

  // 统计某学院的学生人数
  countStudentsInDepartment: async (departmentId: string) => {
    return await prisma.student.count({
      where: { departmentId }
    });
  },

};

// 专业相关操作
export const majorOperations = {
  // 创建专业
  create: async (data: any) => {
    return await prisma.major.create({ data });
  },

  // 根据ID查找专业
  findById: async (id: string) => {
    return await prisma.major.findUnique({
      where: { id },
      include: {
        department: true,
        students: true,
        teachers: true
      }
    });
  },

  // 更新专业信息
  update: async (id: string, data: any) => {
    return await prisma.major.update({
      where: { id },
      data
    });
  },

  // 删除专业
  delete: async (id: string) => {
    return await prisma.major.delete({
      where: { id }
    });
  },

  // 获取所有专业
  findAll: async (params?: { skip?: number; take?: number; where?: any }) => {
    return await prisma.major.findMany({
      ...params,
      include: {
        department: true
      }
    });
  },

  // 统计专业数量
  count: async (where?: any) => {
    return await prisma.major.count({ where });
  },

  // 统计某专业的学生人数
  countStudentsInMajor: async (majorId: string) => {
    return await prisma.student.count({
      where: { majorId }
    });
  },
};

// 课程相关操作
export const courseOperations = {
  // 创建课程
  create: async (data: any) => {
    return await prisma.course.create({ data });
  },

  // 根据ID查找课程
  findById: async (id: string) => {
    return await prisma.course.findUnique({
      where: { id },
      include: {
        teacher: true,
        department: true,
        courseEnrollments: {
          include: { student: true }
        }
      }
    });
  },

  // 更新课程信息
  update: async (id: string, data: any) => {
    return await prisma.course.update({
      where: { id },
      data
    });
  },

  // 删除课程
  delete: async (id: string) => {
    return await prisma.course.delete({
      where: { id }
    });
  },

  // 获取所有课程
  findAll: async (params?: { skip?: number; take?: number; where?: any }) => {
    return await prisma.course.findMany({
      ...params,
      include: {
        teacher: true,
        department: true
      }
    });
  },

  // 统计课程数量
  count: async (where?: any) => {
    return await prisma.course.count({ where });
  },

  // 统计某课程的学生人数
  countStudentsInCourse: async (courseId: string) => {
    return await prisma.courseEnrollment.count({
      where: { courseId }
    });
  },

};

// 课程选修关系相关操作
export const courseEnrollmentOperations = {
  // 创建选修关系
  create: async (data: any) => {
    return await prisma.courseEnrollment.create({ data });
  },

  // 根据ID查找选修关系
  findById: async (id: string) => {
    return await prisma.courseEnrollment.findUnique({
      where: { id },
      include: {
        student: true,
        course: true
      }
    });
  },

  // 删除选修关系
  delete: async (id: string) => {
    return await prisma.courseEnrollment.delete({
      where: { id }
    });
  },

  // 获取所有选修关系
  findAll: async (params?: { skip?: number; take?: number; where?: any }) => {
    return await prisma.courseEnrollment.findMany({
      ...params,
      include: {
        student: true,
        course: true
      }
    });
  },

  // 统计选修关系数量
  count: async (where?: any) => {
    return await prisma.courseEnrollment.count({ where });
  },

  // 统计某学生选修的课程数量
  countCoursesByStudent: async (studentId: string) => {
    return await prisma.courseEnrollment.count({
      where: { studentId }
    });
  },

  // 查找某学生选修的所有课程
  findCoursesByStudent: async (studentId: string) => {
    return await prisma.courseEnrollment.findMany({
      where: { studentId },
      include: {
        course: {
          include: {
            teacher: true
          }
        }
      }
    });
  },

  // 查找某课程的所有学生
  findStudentsByCourse: async (courseId: string) => {
    return await prisma.courseEnrollment.findMany({
      where: { courseId },
      include: {
        student: {
          include: {
            department: true,
            major: true
          }
        }
      }
    });
  }
};
