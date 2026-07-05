import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      name: string
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    role: string
  }
}