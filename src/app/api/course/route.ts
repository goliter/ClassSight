import { isLogin } from "@/utils/isLogin";
import { createCourse } from "@/db/db";

export async function POST(req: Request) {
  // 检查登录状态
  const loginStatus = await isLogin();
  if (loginStatus === 0) {
    return new Response(JSON.stringify({ error: "未授权访问" }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // 解析请求体数据
    const data = await req.json();
    
    // 验证必要字段
    if (!data || typeof data !== 'object') {
      return new Response(JSON.stringify({ error: "无效的请求数据" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 创建课程
    await createCourse(data);
    
    return new Response(JSON.stringify({ 
      status: 'success',
      message: '课程创建成功'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("创建课程失败:", error);
    const errorMessage = process.env.NODE_ENV === 'development' && error instanceof Error 
      ? error.message 
      : "服务器内部错误";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
