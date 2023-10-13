import React, { useEffect } from 'react'
import { getUser } from './SessionProvider'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'


function ProtectedRoute({ children }: AppProps['pageProps']) {
  const { user } = getUser()
  const adminRoutes = ['/addnew']
  const protectedRoutes = ['/giftcards', '/user', '/addnew']
  const router = useRouter()

  useEffect(() => {
    if (protectedRoutes.includes(router.pathname)) {
      if (!user) {
        router.push('/auth')
      }
      if (adminRoutes.includes(router.pathname) && user?.role !== 'admin') {
        router.push('forbidden')
      }

    }
  }, [user])

  return (
    <>{!user ? null : children}</>
  )
}

export default ProtectedRoute