'use client'

import { useEffect, useState } from 'react'
import { Note } from '@/lib/schema'
import { updateNote } from '@/lib/notesStorage'
// import TiptapEditor from '@/components/editor/TiptapEditor'

import dynamic from 'next/dynamic'

const TiptapEditor = dynamic(
  () => import('@/components/editor/TiptapEditor'),
  { ssr: false }
)


export default function NoteEditorWrapper({
  note,
  canEdit,
  onClose,
}: {
  note: Note
  canEdit: boolean
  onClose: () => void
}) {
  const [content, setContent] = useState(note.content)

  const handleSave = () => {
    updateNote({
      ...note,
      content,
      updatedAt: Date.now(),
    })
    onClose()
  }

  const exportTxt = () => {
    const blob = new Blob([content], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${note.title}.txt`
    link.click()
  }

  const exportPDF = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    printWindow.document.write(content)
    printWindow.print()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[90vh] rounded-2xl shadow-xl flex flex-col">

        <div className="flex justify-between p-4 border-b dark:border-slate-800">
          <h2 className="font-semibold">{note.title}</h2>

          <div className="flex gap-3">
            {/* <button onClick={exportTxt} className="text-sm px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded">
              TXT
            </button> */}
            <button onClick={exportPDF} className="text-sm px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded">
              PDF
            </button>

            {canEdit && (
              <button
                onClick={handleSave}
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            )}

            <button
              onClick={onClose}
              className="text-sm px-3 py-1 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <TiptapEditor
            initialContent={note.content}
            editable={canEdit}
            onChange={setContent}
          />
        </div>

      </div>
    </div>
  )
}
