import Link from 'next/link'

import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'

interface ReturnButtonProps {
  href: string
  label: string
}
export default function ReturnButton({ href, label }: ReturnButtonProps) {
  return (
    <Button size='sm' asChild>
      <Link href={href}>
        <ArrowLeft size={4} />
        {label}
      </Link>
    </Button>
  )
}
