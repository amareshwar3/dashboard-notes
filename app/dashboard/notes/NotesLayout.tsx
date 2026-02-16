'use client'

import { useState } from 'react'
import NotesSidebar, { FilterType } from './NotesSidebar'
import NotesList from './NotesList'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'

export default function NotesLayout() {
  const { toggleTheme, dark } = useTheme()
  const { user, logout } = useAuth()

  const [filter, setFilter] = useState<FilterType>('my-private')

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">

      <NotesSidebar active={filter} setActive={setFilter} />

      <div className="flex-1 p-8 space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            Notes Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm opacity-70">
              {user?.email}
            </span>

            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 transition"
            >
              {dark ? '☀ Light' : '🌙 Dark'}
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition"
            >
              Switch User
            </button>
          </div>
        </div>

        <NotesList filter={filter} />

      </div>
    </div>
  )
}
