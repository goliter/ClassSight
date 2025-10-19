import { isLogin } from "@/utils/isLogin";
import { getAdminById } from "@/db/db";

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
      return new Response(JSON.stringify({ error: "无效的管理员ID" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const admin = await getAdminById(id);
    if (!admin) {
      return new Response(JSON.stringify({ error: "管理员不存在" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ 
      data: admin,
      status: 'success',
      message: '获取管理员详情成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("获取管理员详情失败:", error);
    const errorMessage = process.env.NODE_ENV === 'development' && error instanceof Error 
      ? error.message 
      : "服务器内部错误";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
