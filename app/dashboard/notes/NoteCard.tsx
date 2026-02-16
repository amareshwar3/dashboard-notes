'use client'

import { Note } from '@/lib/schema'

export default function NoteCard({
  note,
  currentUser,
  onOpen,
  onDelete,
  canDelete,
  canEdit,
}: {
  note: Note
  currentUser: string
  onOpen: () => void
  onDelete: () => void
  canDelete: boolean
  canEdit: boolean
}) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4 hover:shadow-md transition">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
          {note.title}
        </h3>

        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
          {note.visibility}
        </span>
      </div>

      {/* Preview Content */}
      <div
        className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      {/* Author */}
      <div className="text-xs text-slate-500 dark:text-slate-400">
        By {note.createdBy}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">

        <button
          onClick={onOpen}
          className="text-sm px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
        >
          {canEdit ? 'Open / Edit' : 'View'}
        </button>

        {canDelete && (
          <button
            onClick={onDelete}
            className="text-sm px-3 py-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition"
          >
            Delete
          </button>
        )}

      </div>

    </div>
  )
}
