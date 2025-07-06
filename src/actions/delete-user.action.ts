'use server'

import { db } from '@/db'
import { user } from '@/db/schema'
import { auth } from '@/lib/auth'
import { APIError } from 'better-auth/api'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function deleteUserAction({ userId }: { userId: string }) {
  const headersList = await headers()

  const session = await auth.api.getSession({
    headers: headersList
  })

  if (!session) throw new Error('Unauthorized')

  // Set so that you cannot delete yourself

  if (session.user.role !== 'admin' || session.user.id === userId) {
    throw new Error('Forbidden')
  }

  try {
    await db.delete(user).where(eq(user.id, userId))

    if (session.user.id === userId) {
      await auth.api.signOut({ headers: headersList })
      redirect('/sign-in')
    }

    revalidatePath('/dashboard/admin')
    return { success: true, error: null }
  } catch (err) {
    if (err instanceof APIError) {
      return { success: false, error: err.message }
    }
    return { success: false, error: 'Internal Server Error' }
  }
}
