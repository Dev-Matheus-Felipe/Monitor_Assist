import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import Google from "next-auth/providers/google"

export const { auth, handlers, signIn, signOut } = NextAuth({
  // adapter usado e métodos de logins disponíveis
  adapter: PrismaAdapter(prisma),
  providers: [Google],

  // méotodo de persistencia de dados no banco de dados, com a persistencia do login dada logo abaixo
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    // se não tiver email não loga
    async signIn({user}){
        return !!user.email;
    },

    // atualiza a sessão atual baseado no que eu quero que tenha
    async session({ session, user, token }) {
        if (user) {
            session.user = {
                id: user.id,
                email: user.email,
                image: user.image,
                name: user.name ?? "",
                emailVerified: user.emailVerified,
                activeProfile: user.activeProfile,
            };
        }

        return session;
    },
  },
})