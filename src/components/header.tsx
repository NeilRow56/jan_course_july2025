import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { ModeToggle } from './mode-toggle'
import { Logout } from './logout'

export function Header() {
  return (
    <header className='animate-slide bg-background sticky top-0 z-20 border-b px-2'>
      <div className='flex h-12 w-full items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link
            href='/'
            className='ml-0 flex items-center justify-center gap-2'
            title='Home'
          >
            <h1 className='m-0 hidden text-xl font-bold sm:block'>
              Jan - Better Auth - Course
            </h1>
          </Link>
        </div>

        <div className='flex h-12 items-center gap-2'>
          <Link href='/profile'>
            <Button className='bg-blue-600 text-white hover:bg-blue-400 dark:hover:text-gray-900'>
              Profile
            </Button>
          </Link>
          <Link href='/login'>
            <Button>Login</Button>
          </Link>
          <Link href='/signup'>
            <Button>Signup</Button>
          </Link>
          <Logout />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
