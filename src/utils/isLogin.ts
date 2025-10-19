import { auth } from "@/auth/auth";

export async function isLogin() {
  const session = await auth();
  if (!session) {
    return 0;
  }
  return 1;
}
