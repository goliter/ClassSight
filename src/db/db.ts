import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export default prisma;

// 学生相关操作
export const studentOperations = {
  // 创建学生
  create: async (data: { studentId: string; password: string }) => {
    return await prisma.student.create({ data });
  },

  // 根据ID查找学生
  findById: async (studentId: string) => {
    return await prisma.student.findUnique({
      where: { studentId },
    });
  },

  // 删除学生
  delete: async (studentId: string) => {
    return await prisma.student.delete({
      where: { studentId },
    });
  },
};

// 老师相关操作
export const teacherOperations = {
  // 创建老师
  create: async (data: { teacherId: string; password: string }) => {
    return await prisma.teacher.create({ data });
  },

  // 根据ID查找老师
  findById: async (teacherId: string) => {
    return await prisma.teacher.findUnique({
      where: { teacherId },
    });
  },

  // 删除老师
  delete: async (teacherId: string) => {
    return await prisma.teacher.delete({
      where: { teacherId },
    });
  },
};

// 管理员相关操作
export const adminOperations = {
  // 创建管理员
  create: async (data: { adminId: string; password: string }) => {
    return await prisma.admin.create({ data });
  },

  // 根据ID查找管理员
  findById: async (adminId: string) => {
    return await prisma.admin.findUnique({
      where: { adminId },
    });
  },

  // 删除管理员
  delete: async (adminId: string) => {
    return await prisma.admin.delete({
      where: { adminId },
    });
  },
};
