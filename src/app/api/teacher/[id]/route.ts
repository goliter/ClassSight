import { isLogin } from "@/utils/isLogin";
import { getTeacherById, deleteTeacher, updateTeacher } from "@/db/db";

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
      return new Response(JSON.stringify({ error: "无效的教师ID" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const teacher = await getTeacherById(id);
    if (!teacher) {
      return new Response(JSON.stringify({ error: "教师不存在" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ 
      data: teacher,
      status: 'success',
      message: '获取教师详情成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("获取教师详情失败:", error);
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
      return new Response(JSON.stringify({ error: "无效的教师ID" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const teacher = await getTeacherById(id);
    if (!teacher) {
      return new Response(JSON.stringify({ error: "教师不存在" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 删除教师
    await deleteTeacher(id);
    
    return new Response(JSON.stringify({ 
      status: 'success',
      message: '教师删除成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("删除教师失败:", error);
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
      return new Response(JSON.stringify({ error: "无效的教师ID" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const teacher = await getTeacherById(id);
    if (!teacher) {
      return new Response(JSON.stringify({ error: "教师不存在" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 解析请求体数据
    const data = await req.json();
    
    // 验证必要字段
    if (!data || typeof data !== 'object') {
      return new Response(JSON.stringify({ error: "无效的请求数据" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 更新教师信息
    await updateTeacher(id, data);
    
    return new Response(JSON.stringify({ 
      status: 'success',
      message: '教师更新成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("更新教师失败:", error);
    const errorMessage = process.env.NODE_ENV === 'development' && error instanceof Error 
      ? error.message 
      : "服务器内部错误";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}