import { isLogin } from "@/utils/isLogin";
import { getAdminById } from "@/db/db";

export async function GET(req: Request) {
  const loginStatus = await isLogin();
  if (loginStatus === 0) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const id = req.url.split("/").pop() as string;
    const admin = await getAdminById(id);
    if (!admin) {
      return new Response("Admin not found", { status: 404 });
    }
    return new Response(JSON.stringify(admin), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
