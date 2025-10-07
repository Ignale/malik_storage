"use client"

import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { get, getDatabase, ref } from 'firebase/database'
import { users } from "../fireBaseConfig";
import nookies from 'nookies';
import { authTypes } from "@/types/authTypes";
import { useRouter, usePathname } from 'next/navigation'
import SessionContext from './ClientSession'

export default function SessionProvider({ children }: any) {
  const [currUser, setCurrUser] = useState<authTypes['user'] | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    users.onIdTokenChanged(async (user) => {
      if (!user) {
        setCurrUser(null)
        nookies.set(undefined, 'token', '', { path: '/' });
        router.push('/auth')
      } else {
        const token = await user.getIdToken();
        const db = getDatabase()
        const userSnapshot = await get(ref(db, `users/${user.uid}`))
        setCurrUser(userSnapshot.val());
        nookies.set(undefined, 'token', token, { path: '/' })
      }
    })
  }, [pathname, router])

  return (
    <>
      <SessionContext.Provider value={{ user: currUser }}>
        {children}
      </SessionContext.Provider>
    </>
  )
}