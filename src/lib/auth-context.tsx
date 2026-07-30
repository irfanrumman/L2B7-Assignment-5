'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type UserRole = 'tenant' | 'landlord' | 'admin' | null

interface AuthContextType {
  user: { email: string; role: UserRole } | null
  login: (email: string, role: UserRole) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string; role: UserRole } | null>(null)

  // Hydrate from localStorage
  useEffect(() => {
    if (typeof localStorage === 'undefined') return
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('[v0] Failed to parse stored user:', e)
      }
    }
  }, [])

  const login = (email: string, role: UserRole) => {
    const newUser = { email, role }
    setUser(newUser)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(newUser))
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('auth_user')
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
