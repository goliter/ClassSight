import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getStudentById, getTeacherById, getAdminById } from "@/db/db";

// 定义我们系统中的用户类型
interface SystemUser {
  password: string;
  role: number;
  studentId?: string;
  teacherId?: string;
  adminId?: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        account: { label: "Account", type: "text", placeholder: "账号" },
        password: { label: "Password", type: "password", placeholder: "密码" },
        role: { label: "Role", type: "text", placeholder: "角色" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error("无效的登录信息");
        }

        const account = credentials.account as string;
        const password = credentials.password as string;
        const role = credentials.role as string;

        if (!account || !password || !role) {
          throw new Error("请填写完整的登录信息");
        }

        let user = null;
        if (role === "student") {
          user = await getStudentById(account);
        } else if (role === "teacher") {
          user = await getTeacherById(account);
        } else if (role === "admin") {
          user = await getAdminById(account);
        } else {
          throw new Error("不存在该用户");
        }

        if (!user) {
          throw new Error("用户不存在");
        }

        if (user.password !== password) {
          throw new Error("密码错误");
        }

        const systemUser = user as SystemUser;
        let userId = "";
        if (systemUser.studentId) {
          userId = systemUser.studentId;
        } else if (systemUser.teacherId) {
          userId = systemUser.teacherId;
        } else if (systemUser.adminId) {
          userId = systemUser.adminId;
        }

        return {
          id: userId,
          ...user,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 初次登录时 user 会存在，将 user.id 写入 token 中
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // 将 token 中的 id 写入 session 中，这样前端就可以通过 session.user.id 获取到
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
