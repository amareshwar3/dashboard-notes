'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type ThemeContextType = {
  dark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('hsbc-theme')
    if (saved === 'dark') {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newDark = !dark
    setDark(newDark)

    if (newDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('hsbc-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('hsbc-theme', 'light')
    }
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}
