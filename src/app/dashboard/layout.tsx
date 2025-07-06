import { Header } from '@/components/header'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme-provider'

export default function JobSeekerLayout({
  children
}: {
  children: ReactNode
  sidebar: ReactNode
}) {
  return (
    <div>
      <div className='mx-auto w-full max-w-7xl items-center'>
        <Header />
      </div>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </div>
  )
}
