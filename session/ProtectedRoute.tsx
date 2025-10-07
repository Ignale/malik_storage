"use client"

import React, { useEffect } from 'react'
import { useSession } from './ClientSession'
import { useRouter, usePathname } from 'next/navigation'
import { AppProps } from 'next/app'


function ProtectedRoute({ children }: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { user } = useSession()

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const adminRoutes = ['/addnew']
    const protectedRoutes = ['/giftcards', '/user', '/addnew']
    if (protectedRoutes.includes(pathname || '')) {
      if (!user) {
        router.push('/auth')
      }
      if (adminRoutes.includes(pathname || '') && user?.role !== 'admin') {
        router.push('forbidden')
      }

    }
  }, [pathname, router, user])

  return (
    <>{!user ? null : children}</>
  )
}

export default ProtectedRoute