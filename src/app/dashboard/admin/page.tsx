import {
  DeleteUserButton,
  PlaceholderDeleteUserButton
} from '@/components/delete-user-button'
import ReturnButton from '@/components/return-button'
import { auth } from '@/lib/auth'
import { USER_ROLES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { findAllUsers } from '@/resources/user-queries'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/auth/login')

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

  const users = await findAllUsers()
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
          {users.map(user => (
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
              <td className='px-6 py-3 uppercase'>{user.role}</td>
              <td className='px-6 py-3'>
                {user.role === 'user' ? (
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
