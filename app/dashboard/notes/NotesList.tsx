'use client'

import { useEffect, useState } from 'react'
import { Note } from '@/lib/schema'
import { getAllNotes, createNote, deleteNote } from '@/lib/notesStorage'
import { useAuth } from '@/context/AuthContext'
import NoteCard from './NoteCard'
import { FilterType } from './NotesSidebar'
import CreateNoteModal from './CreateNoteModal'
import NoteEditorWrapper from './NoteEditorWrapper'
import { v4 as uuidv4 } from 'uuid'

interface NotesListProps {
  filter: FilterType
}

export default function NotesList({ filter }: NotesListProps) {
  const { user } = useAuth()
  const [notes, setNotes] = useState<Note[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const refreshNotes = () => {
    setNotes(getAllNotes())
  }

  useEffect(() => {
    refreshNotes()
  }, [])

  if (!user) return null

  const filteredNotes = notes.filter(note => {
    if (filter === 'my-private') {
      return note.createdBy === user.email && note.visibility === 'private'
    }
    if (filter === 'my-public') {
      return note.createdBy === user.email && note.visibility === 'public'
    }
    if (filter === 'other-public') {
      return note.createdBy !== user.email && note.visibility === 'public'
    }
    return true
  })

  const handleCreate = (
    title: string,
    visibility: 'private' | 'public',
    permission: 'view' | 'edit'
  ) => {
    const newNote: Note = {
      id: uuidv4(),
      title,
      content: '',
      createdBy: user.email,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      visibility,
      permission,
    }

    createNote(newNote)
    refreshNotes()
    setShowCreate(false)
  }

  const handleDelete = (id: string) => {
    deleteNote(id)
    refreshNotes()
  }

  return (
    <div className="space-y-6">

      {/* Create Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowCreate(true)}
          className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition"
        >
          + Create Note
        </button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredNotes.length === 0 && (
          <div className="opacity-60">No notes found.</div>
        )}

        {filteredNotes.map(note => {
          const isOwner = note.createdBy === user.email

          const canEdit =
            isOwner ||
            (note.visibility === 'public' && note.permission === 'edit')

          return (
            <NoteCard
              key={note.id}
              note={note}
              currentUser={user.email}
              onOpen={() => setSelectedNote(note)}
              onDelete={() => handleDelete(note.id)}
              canDelete={isOwner}
              canEdit={canEdit}
            />
          )
        })}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <CreateNoteModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}

      {/* Editor */}
      {selectedNote && (
        <NoteEditorWrapper
          note={selectedNote}
          canEdit={
            selectedNote.createdBy === user.email ||
            (selectedNote.visibility === 'public' &&
              selectedNote.permission === 'edit')
          }
          onClose={() => {
            setSelectedNote(null)
            refreshNotes()
          }}
        />
      )}
    </div>
  )
}
