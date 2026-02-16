'use client'

import { useAuth } from '@/context/AuthContext'
import NotesLayout from './NotesLayout'
import { useState } from 'react'

export default function NotesPage() {
  const { user, login } = useAuth()
  const [emailInput, setEmailInput] = useState('')

if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Notes Dashboard
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Sign in with your email to continue
          </p>
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          value={emailInput}
          onChange={e => setEmailInput(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />

        <button
          onClick={() => login(emailInput)}
          className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
        >
          Continue
        </button>
      </div>
    </div>
  )
}


  return <NotesLayout />
}
