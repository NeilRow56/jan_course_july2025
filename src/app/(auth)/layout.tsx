import { buttonVariants } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative flex min-h-svh flex-col items-center justify-center'>
      <Link
        href='/'
        className={buttonVariants({
          variant: 'outline',
          className: 'absolute top-4 left-4'
        })}
      >
        <ArrowLeft className='size-4' />
        Back
      </Link>
      <div className='flex w-full max-w-sm flex-col gap-6'>{children}</div>
    </div>
  )
}
