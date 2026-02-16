'use client'

import { useState } from 'react'
import { Visibility, Permission } from '@/lib/schema'

export default function CreateNoteModal({
  onClose,
  onCreate,
}: {
  onClose: () => void
  onCreate: (title: string, visibility: Visibility, permission: Permission) => void
}) {
  const [title, setTitle] = useState('')
  const [visibility, setVisibility] = useState<Visibility>('private')
  const [permission, setPermission] = useState<Permission>('view')

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-xl border border-slate-200 dark:border-slate-700">

        <h2 className="text-lg font-semibold">Create New Note</h2>

        <input
          placeholder="Note title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg border dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
        />

        <select
          value={visibility}
          onChange={e => setVisibility(e.target.value as Visibility)}
          className="w-full p-3 rounded-lg border dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        {visibility === 'public' && (
          <select
            value={permission}
            onChange={e => setPermission(e.target.value as Permission)}
            className="w-full p-3 rounded-lg border dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
          >
            <option value="view">View Only</option>
            <option value="edit">Editable by Everyone</option>
          </select>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-300 dark:bg-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={() => onCreate(title, visibility, permission)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
