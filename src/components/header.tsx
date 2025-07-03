import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { ModeToggle } from './mode-toggle'

export function Header() {
  return (
    <header className='animate-slide bg-background sticky top-0 z-20 border-b px-2'>
      <div className='flex h-12 w-full items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link
            href='/home'
            className='ml-0 flex items-center justify-center gap-2'
            title='Home'
          >
            <h1 className='m-0 hidden text-xl font-bold sm:block'>
              Computer Repair Shop
            </h1>
          </Link>
        </div>

        <div className='flex h-12 items-center'>
          <ModeToggle />
          <Button
            variant='ghost'
            size='icon'
            aria-label='LogOut'
            title='LogOut'
            className='rounded-full'
            asChild
          >
            LogOUT
          </Button>
        </div>
      </div>
    </header>
  )
}
