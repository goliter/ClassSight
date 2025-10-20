import { isLogin } from "@/utils/isLogin";
import { getStudentById, deleteStudent, updateStudent } from "@/db/db";

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
      return new Response(JSON.stringify({ error: "无效的学生ID" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const student = await getStudentById(id);
    if (!student) {
      return new Response(JSON.stringify({ error: "学生不存在" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ 
      data: student,
      status: 'success',
      message: '获取学生详情成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("获取学生详情失败:", error);
    const errorMessage = process.env.NODE_ENV === 'development' && error instanceof Error 
      ? error.message 
      : "服务器内部错误";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

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
    const { id } = params;
    
    // 验证ID格式
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return new Response(JSON.stringify({ error: "无效的学生ID" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await deleteStudent(id);
    return new Response(JSON.stringify({ 
      status: 'success',
      message: '学生删除成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("删除学生失败:", error);
    const errorMessage = process.env.NODE_ENV === 'development' && error instanceof Error 
      ? error.message 
      : "服务器内部错误";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}


export async function PUT(
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
      return new Response(JSON.stringify({ error: "无效的学生ID" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const student = await getStudentById(id);
    if (!student) {
      return new Response(JSON.stringify({ error: "学生不存在" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await req.json();
    await updateStudent(id, data);
    return new Response(JSON.stringify({ 
      status: 'success',
      message: '学生信息更新成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("更新学生信息失败:", error);
    const errorMessage = process.env.NODE_ENV === 'development' && error instanceof Error 
      ? error.message 
      : "服务器内部错误";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

