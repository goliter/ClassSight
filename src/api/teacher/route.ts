import { isLogin } from "@/utils/isLogin";
import { createTeacher } from "@/db/db";

export async function POST(req: Request) {
  const loginStatus = await isLogin();
  if (loginStatus === 0) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const data = await req.json();
    await createTeacher(data);
    return new Response("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
