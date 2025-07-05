import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import type { auth } from './auth'
const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  plugins: [inferAdditionalFields<typeof auth>()]
})

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
  updateUser
} = authClient
