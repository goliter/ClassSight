import { isLogin } from "@/utils/isLogin";
import { getCourseStudents, addStudentToCourse, removeStudentFromCourse } from "@/db/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // 检查登录状态
  const loginStatus = await isLogin();
  if (loginStatus === 0) {
    return new Response(JSON.stringify({ error: "未授权访问" }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { id } = params;
    
    // 验证ID格式
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return new Response(JSON.stringify({ error: "无效的课程ID" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const students = await getCourseStudents(id);
    
    return new Response(JSON.stringify({ 
      data: students || [],
      status: 'success',
      message: '获取课程学生列表成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("获取课程学生列表失败:", error);
    const errorMessage = process.env.NODE_ENV === 'development' && error instanceof Error 
      ? error.message 
      : "服务器内部错误";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 添加学生到课程
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  // 检查登录状态
  const loginStatus = await isLogin();
  if (loginStatus === 0) {
    return new Response(JSON.stringify({ error: "未授权访问" }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { id: courseId } = params;
    
    // 验证课程ID格式
    if (!courseId || typeof courseId !== 'string' || courseId.trim() === '') {
      return new Response(JSON.stringify({ error: "无效的课程ID" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 获取请求体数据
    const body = await req.json();
    const { studentId } = body;
    
    // 验证学生ID
    if (!studentId || typeof studentId !== 'string' || studentId.trim() === '') {
      return new Response(JSON.stringify({ error: "无效的学生ID" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 调用数据库函数添加学生到课程
    const result = await addStudentToCourse(studentId, courseId);
    
    return new Response(JSON.stringify({ 
      data: result,
      status: 'success',
      message: '添加学生到课程成功'
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("添加学生到课程失败:", error);
    const errorMessage = process.env.NODE_ENV === 'development' && error instanceof Error 
      ? error.message 
      : "服务器内部错误";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 从课程中移除学生
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  // 检查登录状态
  const loginStatus = await isLogin();
  if (loginStatus === 0) {
    return new Response(JSON.stringify({ error: "未授权访问" }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { id: courseId } = params;
    
    // 验证课程ID格式
    if (!courseId || typeof courseId !== 'string' || courseId.trim() === '') {
      return new Response(JSON.stringify({ error: "无效的课程ID" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 获取请求体数据
    const body = await req.json();
    const { studentId } = body;
    
    // 验证学生ID
    if (!studentId || typeof studentId !== 'string' || studentId.trim() === '') {
      return new Response(JSON.stringify({ error: "无效的学生ID" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 调用数据库函数从课程中移除学生
    const success = await removeStudentFromCourse(studentId, courseId);
    
    if (!success) {
      return new Response(JSON.stringify({ 
        error: "学生不在课程中或移除失败"
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ 
      status: 'success',
      message: '从课程中移除学生成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("从课程中移除学生失败:", error);
    const errorMessage = process.env.NODE_ENV === 'development' && error instanceof Error 
      ? error.message 
      : "服务器内部错误";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
