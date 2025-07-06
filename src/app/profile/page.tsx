import { Logout } from '@/components/logout'
import ReturnButton from '@/components/return-button'
import { Button } from '@/components/ui/button'

import { auth } from '@/lib/auth'
import { USER_ROLES } from '@/lib/constants'

import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/login')

  return (
    <div className='container mx-auto max-w-screen-lg space-y-8 px-8 py-16'>
      <div className='items-center gap-2 space-y-4'>
        <div className='flex items-center gap-2'>
          <ReturnButton href='/' label='Home' />
          {session.user.role === USER_ROLES.ADMIN && (
            <Button size='sm' asChild>
              <Link href='/dashboard/admin'>Admin Dashboard</Link>
            </Button>
          )}
        </div>

        <h1 className='text-3xl font-bold'>Profile</h1>

        <Logout />

        <pre className='overflow-clip text-sm'>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  )
}
