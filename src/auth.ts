import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import prisma from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    // Find user in database
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string }
                    })

                    if (!user) {
                        return null
                    }

                    // Check if user is active
                    if (!user.isActive) {
                        return null
                    }

                    // Verify password
                    const passwordCorrect = await compare(
                        credentials.password as string,
                        user.password
                    )

                    if (passwordCorrect) {
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name
                        }
                    }
                } catch (error) {
                    console.error('Auth error:', error)
                }

                return null
            }
        })
    ],
    secret: process.env.AUTH_SECRET || "fayed-clinic-secret-key-2024-replace-in-production",
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/en/auth/signin',
    },
})
