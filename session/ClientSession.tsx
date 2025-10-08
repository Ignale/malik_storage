"use client"

import { createContext, useContext } from 'react'
import { authTypes } from '@/types/authTypes'

export const SessionContext = createContext<{ user: authTypes['user'] | null }>({ user: null })

export const useSession = () => {
  return useContext(SessionContext)
}

export default SessionContext
