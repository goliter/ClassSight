import { isLogin } from "@/utils/isLogin";
import { getCourseStudents } from "@/db/db";

export async function GET(req: Request) {
  const loginStatus = await isLogin();
  if (loginStatus === 0) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const id = req.url.split("/").pop() as string;
    const students = await getCourseStudents(id);
    if (!students) {
      return new Response("Students not found", { status: 404 });
    }
    return new Response(JSON.stringify(students), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
