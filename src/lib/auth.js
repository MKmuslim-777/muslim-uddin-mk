import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        const validUser = process.env.ADMIN_USERNAME || "mk777";
        const validPass = process.env.ADMIN_PASSWORD || "mk777admin";
        if (credentials.username !== validUser) return null;
        if (credentials.password !== validPass) return null;
        return { id: "1", name: "Muslim Uddin MK", email: "admin@mk777.dev" };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login", error: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
