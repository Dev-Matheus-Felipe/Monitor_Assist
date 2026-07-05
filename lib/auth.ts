import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import Google from "next-auth/providers/google"

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],

  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async signIn({user}){
        return !!user.email;
    },

    async session({ session, user }) {
        if (user) {
            session.user = {
                id: user.id,
                email: user.email,
                image: user.image,
                name: user.name ?? "",
                emailVerified: user.emailVerified,
                role: user.role
            };
        }

        return session;
    },
  },
})