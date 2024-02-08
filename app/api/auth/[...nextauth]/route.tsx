import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import GoogleProvider from "next-auth/providers/google";

import { db } from "@/lib/database";

export const authOptions: any = {
  adapter: PrismaAdapter({ ...db, ...{ adapter: "prisma" } }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
}

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   secret: process.env.NEXTAUTH_SECRET,
//   session: { strategy: "jwt" },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ]
// });

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };