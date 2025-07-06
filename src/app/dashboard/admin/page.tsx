import {
  DeleteUserButton,
  PlaceholderDeleteUserButton
} from '@/components/delete-user-button'
import ReturnButton from '@/components/return-button'
import { UserRoleSelect } from '@/components/user-role-select'
import { UserRole } from '@/db/schema'
import { auth } from '@/lib/auth'
import { USER_ROLES } from '@/lib/constants'
import { cn } from '@/lib/utils'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const headersList = await headers()

  const session = await auth.api.getSession({
    headers: headersList
  })

  if (!session) redirect('/login')

  if (session.user.role !== USER_ROLES.ADMIN) {
    return (
      <div className='container mx-auto max-w-screen-lg space-y-8 px-8 py-16'>
        <div className='space-y-4'>
          <ReturnButton href='/dashboard' label='dashboard' />

          <h1 className='text-3xl font-bold'>Admin Dashboard</h1>

          <p className='rounded-md bg-red-600 p-2 text-lg font-bold text-white'>
            FORBIDDEN
          </p>
        </div>
      </div>
    )
  }

  const { users } = await auth.api.listUsers({
    headers: headersList,
    query: {
      sortBy: 'name'
    }
  })

  const sortedUsers = users.sort((a, b) => {
    if (a.role === 'ADMIN' && b.role !== 'ADMIN') return -1
    if (a.role !== 'ADMIN' && b.role === 'ADMIN') return 1
    return 0
  })
  return (
    <div className='container mx-auto max-w-screen-lg space-y-8 px-8 py-16'>
      <div className='space-y-4'>
        <ReturnButton href='/profile' label='Profile' />

        <h1 className='text-3xl font-bold'>Admin Dashboard</h1>

        <p className='rounded-md bg-green-600 p-2 text-lg font-bold text-white'>
          ACCESS GRANTED
        </p>
      </div>

      <div className='w-full overflow-x-auto' />
      <table className='mt-4 min-w-full table-auto whitespace-nowrap'>
        <thead>
          <tr className='divide-x'>
            <th className='bg-primary px-6 py-3 text-start text-white'>id</th>
            <th className='bg-primary px-6 py-3 text-start text-white'>
              username
            </th>
            <th className='bg-primary px-6 py-3 text-start text-white'>
              email
            </th>
            <th className='bg-primary px-6 py-3 text-start text-white'>
              date created
            </th>
            <th className='bg-primary px-6 py-3 text-start text-white'>role</th>
            <th className='bg-primary px-6 py-3 text-start text-white'>
              action
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedUsers.map(user => (
            <tr key={user.id} className='border-b text-left text-sm'>
              <td className='px-6 py-3'>{user.id.slice(0, 8)}</td>
              <td
                className={cn('px-6 py-3', {
                  'opacity-50': user.name === null
                })}
              >
                {user.name ?? 'NULL'}
              </td>
              <td className='px-6 py-3'>{user.email}</td>
              <td className='px-6 py-3'>
                {user.createdAt.toLocaleDateString('en-GB', {
                  timeZone: 'UTC'
                })}
              </td>
              <td className='px-6 py-3 uppercase'>
                <UserRoleSelect userId={user.id} role={user.role as UserRole} />
              </td>
              <td className='px-6 py-3'>
                {user.role === 'USER' ? (
                  <DeleteUserButton userId={user.id} />
                ) : (
                  <PlaceholderDeleteUserButton />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
