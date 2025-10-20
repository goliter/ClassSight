/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export default prisma;

// 创建学生
export  async function createStudent(student: any) {
  return prisma.student.create({
    data: student,
  });
}

//获取所有学生
export async function getStudents() {
  return prisma.student.findMany({
    include: {
      department: true,
    }
  });
}

//删除学生
export async function deleteStudent(studentId: string) {
  return prisma.student.delete({
    where: {
      studentId,
    },
  });
}

//根据学生id查询学生（包含关联的学院、专业信息）
export async function getStudentById(studentId: string) {
  return prisma.student.findUnique({
    where: {
      studentId,
    },
    include: {
      department: true,
      courseEnrollments: true
    }
  });
}

//获取学生的课程数量
export async function getStudentCourseCount(studentId: string) {
  const count = await prisma.courseEnrollment.count({
    where: {
      studentId
    }
  });
  return count;
}

//修改学生信息
export async function updateStudent(studentId: string, data: any) {
  return prisma.student.update({
    where: {
      studentId,
    },
    data: data,
  });
}

//通过学生id查询学生的课程信息
export async function getStudentCourses(studentId: string) {
  return prisma.courseEnrollment.findMany({
    where: {
      studentId
    },
    include: {
      course: true
    }
  });
}

//创建老师
export async function createTeacher(teacher: any) {
  return prisma.teacher.create({
    data: teacher,
  });
}

//删除老师
export async function deleteTeacher(teacherId: string) {
  return prisma.teacher.delete({
    where: {
      teacherId,
    },
  });
}

//获取所有老师
export async function getTeachers() {
  return prisma.teacher.findMany({
    include: {
      courses: true
    }
  });
}

//根据老师id查询老师
export async function getTeacherById(teacherId: string) {
  return prisma.teacher.findUnique({
    where: {
      teacherId,
    },
  });
}

//修改老师信息
export async function updateTeacher(teacherId: string, data: any) {
  return prisma.teacher.update({
    where: {
      teacherId,
    },
    data: data,
  });
}

//根据老师id查询老师的课程信息
export async function getTeacherCourses(teacherId: string) {
  return prisma.course.findMany({
    where: {
      teacherId
    },
  });
}

//创建管理员
export async function createAdmin(admin: any) {
  return prisma.admin.create({
    data: admin,
  });
}

//删除管理员
export async function deleteAdmin(adminId: string) {
  return prisma.admin.delete({
    where: {
      adminId,
    },
  });
}

//根据管理员id查询管理员
export async function getAdminById(adminId: string) {
  return prisma.admin.findUnique({
    where: {
      adminId,
    },
  });
}

//修改管理员信息
export async function updateAdmin(adminId: string, data: any) {
  return prisma.admin.update({
    where: {
      adminId,
    },
    data: data,
  });
}

//新建课程
export async function createCourse(course: any) {
  return prisma.course.create({
    data: course,
  });
}

//根据课程id查询课程
export async function getCourseById(id: string) {
  return prisma.course.findUnique({
    where: {
      id,
    },
  });
}

//根据课程id查询课程的学生信息
export async function getCourseStudents(id: string) {
  return prisma.courseEnrollment.findMany({
    where: {
      courseId: id
    },
    include: {
      student: true
    }
  });
}

//删除课程
export async function deleteCourse(id: string) {
  return prisma.course.delete({
    where: {
      id,
    },
  });
}

//新建学院
export async function createDepartment(department: any) {
  return prisma.department.create({
    data: department,
  });
}

//根据学院id查询学院
export async function getDepartmentById(id: string) {
  return prisma.department.findUnique({
    where: {
      id,
    },
  });
}

//修改学院
export async function updateDepartment(id: string, data: any) {
  return prisma.department.update({
    where: {
      id,
    },
    data: data,
  });
}

//删除学院
export async function deleteDepartment(id: string) {
  return prisma.department.delete({
    where: {
      id,
    },
  });
}

//获取所有学院列表
export async function getAllDepartments() {
  return prisma.department.findMany();
}

