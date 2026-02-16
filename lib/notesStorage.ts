// /lib/notesStorage.ts

import { Note } from './schema'

const NOTES_KEY = 'hsbc-notes-db'

export function getAllNotes(): Note[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(NOTES_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveAllNotes(notes: Note[]) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
}

export function createNote(note: Note) {
  const notes = getAllNotes()
  notes.push(note)
  saveAllNotes(notes)
}

export function updateNote(updated: Note) {
  const notes = getAllNotes().map(n =>
    n.id === updated.id ? updated : n
  )
  saveAllNotes(notes)
}

export function deleteNote(id: string) {
  const notes = getAllNotes().filter(n => n.id !== id)
  saveAllNotes(notes)
}

export function getNotesByUser(email: string) {
  const notes = getAllNotes()
  return notes.filter(n => n.createdBy === email)
}

export function getPublicNotes() {
  const notes = getAllNotes()
  return notes.filter(n => n.visibility === 'public')
}
