import { Logout } from '@/components/logout'
import ReturnButton from '@/components/return-button'

import { auth } from '@/lib/auth'

import { headers } from 'next/headers'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return <p className='text-destructive'>Unauthorized</p>
  }

  return (
    <div className='container mx-auto max-w-screen-lg space-y-8 px-8 py-16'>
      <div className='space-y-4'>
        <ReturnButton href='/' label='Home' />
        <h1 className='text-3xl font-bold'>Profile</h1>

        <Logout />

        <pre className='overflow-clip text-sm'>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  )
}
