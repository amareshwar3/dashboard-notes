'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@/lib/schema'

type AuthContextType = {
  user: User | null
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const USER_KEY = 'hsbc-user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(USER_KEY)
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const login = (email: string) => {
    const newUser = { email }
    localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
