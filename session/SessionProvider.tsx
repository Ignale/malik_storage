import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { get, getDatabase, ref } from 'firebase/database'
import { users } from "../fireBaseConfig";
import nookies from 'nookies';
import { authTypes } from "@/types/authTypes";
import { useRouter } from "next/router";


const SessionContext = createContext<{ user: authTypes['user'] | null }>({ user: null })


export const getUser = () => {
  return useContext(SessionContext)
}

export default function SessionProvider({ children }: any) {
  const [currUser, setCurrUser] = useState<authTypes['user'] | null>(null)
  const router = useRouter()

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
  }, [router.pathname, users.currentUser])

  return (
    <>
      <SessionContext.Provider value={{ user: currUser }}>
        {children}
      </SessionContext.Provider>
    </>
  )
}