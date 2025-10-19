import { isLogin } from "@/utils/isLogin";
import { getStudentCourses } from "@/db/db";

export async function GET(req: Request) {
  const loginStatus = await isLogin();
  if (loginStatus === 0) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const id = req.url.split("/").pop() as string;
    const courses = await getStudentCourses(id);
    if (!courses) { 
      return new Response("Courses not found", { status: 404 });
    }
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
