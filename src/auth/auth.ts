import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        account: { label: "Account", type: "text", placeholder: "账号" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
});
