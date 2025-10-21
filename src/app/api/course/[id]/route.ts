import { isLogin } from "@/utils/isLogin";
import { getCourseById, updateCourse, deleteCourse } from "@/db/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // 检查登录状态
  const loginStatus = await isLogin();
  if (loginStatus === 0) {
    return new Response(JSON.stringify({ message: "未授权访问" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { id } = params;

    // 验证ID格式
    if (!id || typeof id !== "string" || id.trim() === "") {
      return new Response(JSON.stringify({ message: "无效的学院ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const course = await getCourseById(id);
    if (!course) {
      return new Response(JSON.stringify({ message: "课程不存在" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        data: course,
        status: "success",
        message: "获取课程详情成功",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("获取学院详情失败:", error);
    const errorMessage =
      process.env.NODE_ENV === "development" && error instanceof Error
        ? error.message
        : "服务器内部错误";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
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
    return new Response(JSON.stringify({ message: "未授权访问" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { id } = params;

    // 验证ID格式
    if (!id || typeof id !== "string") {
      return new Response(JSON.stringify({ message: "无效的学院ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 执行删除操作
    const course = await deleteCourse(id);

    // 检查课程是否存在
    if (!course) {
      return new Response(JSON.stringify({ message: "课程不存在" }), {  
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 返回成功响应
    return new Response(
      JSON.stringify({
        message: "课程删除成功",
        data: course,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // 详细的错误日志
    console.error("删除学院时发生错误:", error);

    // 返回友好的错误响应
    return new Response(
      JSON.stringify({
        message: "服务器内部错误",
        error:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  // 检查登录状态
  const loginStatus = await isLogin();
  if (loginStatus === 0) {
    return new Response(JSON.stringify({ message: "未授权访问" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { id } = params;

    // 验证ID格式
    if (!id || typeof id !== "string") {
      return new Response(JSON.stringify({ message: "无效的学院ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 解析请求体数据
    const data = await req.json();
    if (!data || typeof data !== "object") {
      return new Response(JSON.stringify({ message: "无效的请求数据" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 更新课程
    const updatedCourse = await updateCourse(id, data);

    // 检查课程是否存在
    if (!updatedCourse) {
      return new Response(JSON.stringify({ message: "课程不存在" }), {  
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 返回成功响应
    return new Response(
      JSON.stringify({
        message: "课程更新成功",
        data: updatedCourse,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // 详细的错误日志
    console.error("更新学院时发生错误:", error);

    // 返回友好的错误响应
    return new Response(
      JSON.stringify({
        message: "服务器内部错误",
        error:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
