import { isLogin } from "@/utils/isLogin";
import { getTeacherById } from "@/db/db";

export async function GET(req: Request) {
  const loginStatus = await isLogin();
  if (loginStatus === 0) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const id = req.url.split("/").pop() as string;
    const teacher = await getTeacherById(id);
    if (!teacher) {
      return new Response("Teacher not found", { status: 404 });  
    }
    return new Response(JSON.stringify(teacher), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
