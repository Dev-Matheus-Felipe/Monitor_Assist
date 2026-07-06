import { Monitor } from "@prisma/client"
import NextAuth from "next-auth"

// apenas a declaração de tipos para a prevenção de erros de tipagem
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email?: string | null
      image?: string | null
      activeProfile: "aluno" | "monitor"
    }
  }

  interface User {
    id: string
    activeProfile: "aluno" | "monitor"
  }
}