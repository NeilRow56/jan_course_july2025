import { GetStartedButton } from '@/components/get-started-button'

export default function HomePage() {
  return (
    <div className='flex h-dvh items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-8'>
        <h1 className='text-6xl font-bold'>Better Authy</h1>

        <GetStartedButton />
      </div>
    </div>
  )
}
