import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

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

                // For demo purposes - In production, check against database
                // Default admin: admin@fayedclinic.com / Admin123!
                if (credentials.email === "admin@fayedclinic.com") {
                    // This is a demo hash of "Admin123!" - replace with actual DB check
                    const passwordCorrect = credentials.password === "Admin123!"

                    if (passwordCorrect) {
                        return {
                            id: "1",
                            email: "admin@fayedclinic.com",
                            name: "Admin"
                        }
                    }
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
