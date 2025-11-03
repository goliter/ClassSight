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
      course: {
        include: {
          teacher: true,
          department: true
        }
      }
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

//根据课程id查询课程（包含教师和学院信息）
export async function getCourseById(id: string) {
  return prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      teacher: true,
      department: true,
    },
  });
}

//获取所有课程
export async function getAllCourses() {
  return prisma.course.findMany({
    include: {
      teacher: true
    }
  });
}

//更改课程信息
export async function updateCourse(id: string, data: any) {
  return prisma.course.update({
    where: {
      id,
    },
    data: data,
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

//添加学生到课程
export async function addStudentToCourse(studentId: string, courseId: string) {
  try {
    // 验证学生是否存在
    const studentExists = await prisma.student.findUnique({
      where: { studentId }
    });
    
    if (!studentExists) {
      throw new Error(`学生不存在: ${studentId}`);
    }
    
    // 验证课程是否存在
    const courseExists = await prisma.course.findUnique({
      where: { id: courseId }
    });
    
    if (!courseExists) {
      throw new Error(`课程不存在: ${courseId}`);
    }
    
    // 检查学生是否已经在课程中
    const existingEnrollment = await prisma.courseEnrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId
        }
      }
    });

    // 如果已经存在关系，直接返回
    if (existingEnrollment) {
      return existingEnrollment;
    }
    
    // 创建新的课程选修关系并更新计数
    const [enrollment] = await prisma.$transaction([
      prisma.courseEnrollment.create({
        data: {
          studentId,
          courseId
          // 移除status字段
        }
      }),
      prisma.course.update({
        where: { id: courseId },
        data: {
          studentCount: { increment: 1 }
        }
      })
    ]);
    
    return enrollment;
  } catch (error) {
    console.error("添加学生到课程失败:", error);
    throw error;
  }
}

//从课程中移除学生
export async function removeStudentFromCourse(studentId: string, courseId: string) {
  try {
    // 验证学生是否存在 - 使用id字段而不是studentId字段进行查询
    const studentExists = await prisma.student.findUnique({
      where: { studentId: studentId }
    });
    
    if (!studentExists) {
      throw new Error(`学生不存在: ${studentId}`);
    }
    
    // 验证课程是否存在
    const courseExists = await prisma.course.findUnique({
      where: { id: courseId }
    });
    
    if (!courseExists) {
      throw new Error(`课程不存在: ${courseId}`);
    }
    
    // 查找课程选修关系
    const enrollment = await prisma.courseEnrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId
        }
      }
    });

    // 如果存在关系，直接删除并更新计数
    if (enrollment) {
      // 使用事务确保删除和计数更新是原子操作
      await prisma.$transaction([
        prisma.courseEnrollment.delete({
          where: {
            studentId_courseId: {
              studentId,
              courseId
            }
          }
        }),
        prisma.course.update({
          where: { id: courseId },
          data: {
            studentCount: { decrement: 1 }
          }
        })
      ]);
    }
    
    // 无论关系是否存在，都返回成功
    return true;
  } catch (error) {
    console.error("从课程中移除学生失败:", error);
    throw error;
  }
}

//获取课程的所有学生
export async function getCourseStudents(courseId: string) {
  const enrollments = await prisma.courseEnrollment.findMany({
    where: {
      courseId
    },
    include: {
      student: {
        include: {
          department: true
        }
      }
    }
  });

  const result: Array<{
    id: string;
    name: string;
    studentId: string;
    departmentName: string;
    majorName: string;
    grade?: string;
  }> = [];

  // 遍历并进行严格的空值检查
  for (const enrollment of enrollments) {
    // 只处理student不为null的记录
    if (enrollment.student) {
      result.push({
        id: enrollment.student.studentId,
        name: enrollment.student.name,
        studentId: enrollment.student.studentId,
        departmentName: enrollment.student.department?.name || '',
        majorName: enrollment.student.major || '',
        grade: enrollment.student.grade
      });
    }
  }

  return result;
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

