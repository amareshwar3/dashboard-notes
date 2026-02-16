// /lib/schema.ts

export type Visibility = 'private' | 'public'
export type Permission = 'view' | 'edit'

export type Note = {
  id: string
  title: string
  content: string
  createdBy: string
  createdAt: number
  updatedAt: number
  visibility: Visibility
  permission: Permission
}

export type User = {
  email: string
}
