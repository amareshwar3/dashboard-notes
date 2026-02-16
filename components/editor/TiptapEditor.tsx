'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import { OrderedList } from '@tiptap/extension-list'
import BulletList from '@tiptap/extension-bullet-list'
import Highlight from '@tiptap/extension-highlight'
import Color from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'
import { FontFamily } from '@tiptap/extension-text-style'
import { TextStyle } from '@tiptap/extension-text-style'
import Focus from '@tiptap/extension-focus'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import EditorToolbar from './EditorToolbar'

export default function TiptapEditor({
  initialContent,
  editable,
  onChange,
}: {
  initialContent: string
  editable: boolean
  onChange: (content: string) => void
}) {

  const editor = useEditor({
    extensions: [

      StarterKit.configure({
        heading: false,
      }),

      Heading.configure({
        levels: [1, 2, 3],
      }),

      BulletList,
      OrderedList,

      TextStyle,
      FontFamily.configure({
        types: ['textStyle'],
      }),

      Color,
      Highlight.configure({ multicolor: true }),

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),

      Image,
      TaskList,
      TaskItem.configure({ nested: true }),

      Placeholder.configure({
        placeholder: 'Start typing...',
      }),

      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),

      Superscript,
      Subscript,
    ],

    content: initialContent || '<p></p>',

    editable,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          'prose max-w-none dark:prose-invert [&_ol]:list-decimal [&_ul]:list-disc',
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">

      {editable && (
        <EditorToolbar
          editor={editor}
          dark={false}
          onToggleDark={() => {}}
          isFullscreen={false}
          onToggleFullscreen={() => {}}
        />
      )}

      <EditorContent
        editor={editor}
        className="p-4 min-h-[300px] prose prose-slate dark:prose-invert max-w-none"
      />
    </div>
  )
}
