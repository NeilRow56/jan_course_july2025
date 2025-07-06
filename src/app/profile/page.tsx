import { Logout } from '@/components/logout'
import ReturnButton from '@/components/return-button'

import { Button } from '@/components/ui/button'

import { auth } from '@/lib/auth'
import { USER_ROLES } from '@/lib/constants'

import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Page() {
  const headersList = await headers()

  const session = await auth.api.getSession({
    headers: headersList
  })

  if (!session) redirect('/login')

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: {
        posts: ['update', 'delete']
      }
    }
  })

  return (
    <div className='container mx-auto max-w-screen-lg space-y-4 px-8 py-16'>
      <div className='space-y-4'>
        <ReturnButton href='/' label='Home' />

        <h1 className='text-3xl font-bold'>Profile</h1>

        <div className='flex items-center gap-2'>
          {session.user.role === USER_ROLES.ADMIN && (
            <Button size='sm' asChild>
              <Link href='/admin/dashboard'>Admin Dashboard</Link>
            </Button>
          )}

          <Logout />
        </div>
      </div>

      <h2 className='text-2xl font-bold'>Permissions</h2>

      <div className='space-x-4'>
        <Button size='sm'>MANAGE OWN POSTS</Button>
        <Button size='sm' disabled={!FULL_POST_ACCESS.success}>
          MANAGE ALL POSTS
        </Button>
      </div>

      <pre className='overflow-clip text-sm'>
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  )
}
