import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogInIcon } from 'lucide-react'
import React from 'react'

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Welcome back!</CardTitle>
        <CardDescription>Login with your email account</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <Button className='w-full' variant='outline'>
          <LogInIcon className='size-4' />
          Sign in
        </Button>
        <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
          <span className='bg-card text-muted-foreground relative z-10 px-2'>
            {' '}
            Or continue with
          </span>
        </div>
        <div className='grid gap-3'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' placeholder='e.g. m@example.com' />
          </div>
          <Button> Continue with Email</Button>
        </div>
      </CardContent>
    </Card>
  )
}
