import { db } from '@/db'
import { user } from '@/db/schema'
import { auth } from '@/lib/auth'
import { USER_ROLES } from '@/lib/constants'
import { desc, getTableColumns } from 'drizzle-orm'
import { headers } from 'next/headers'
import 'server-only'

export async function findAllUsers() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session?.user?.role !== USER_ROLES.ADMIN) {
    throw new Error('Unauthorized')
  }

  const users = getTableColumns(user)

  const allUsers = await db.select(users).from(user).orderBy(desc(user.role))

  return allUsers
}
