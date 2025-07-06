import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields, adminClient } from 'better-auth/client/plugins'
import type { auth } from './auth'
import { ac, roles } from '@/lib/permissions'

const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  plugins: [inferAdditionalFields<typeof auth>(), adminClient({ ac, roles })]
})

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  admin,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
  updateUser
} = authClient
