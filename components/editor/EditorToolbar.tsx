import { Editor } from '@tiptap/react'
import { useState } from 'react'
import {
  FaBold, FaItalic, FaUnderline, FaStrikethrough, FaImage, FaLink,
  FaUndo, FaRedo, FaListUl, FaListOl,
  FaHeading, FaQuoteRight, FaCode, FaEraser,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
  FaSuperscript, FaSubscript, FaExpand, FaCompress
} from 'react-icons/fa'

//extra features FaLink, FaImage, FaHighlighter, FaTint, FaTasks,
const TEXT_COLORS = ['#000000', '#2563eb', '#16a34a', '#dc2626', '#9333ea', '#fde047', '#ea580c',]
const HIGHLIGHT_COLORS = ['#fde047', '#fecaca', '#ddd6fe', '#a7f3d0', '#fca5a5', '#c4b5fd', '#38bdf8', '#a3e635',]

function downloadFile(filename: string, content: string, type: string = 'text/plain') {
  const blob = new Blob([content], { type })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

function getStyledHTML(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Exported Document</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
  <div class="prose max-w-none m-8">
    ${content}
  </div>
</body>
</html>
  `.trim()
}

type Props = {
  editor: Editor
  dark: boolean
  onToggleDark: () => void
  isFullscreen: boolean
  onToggleFullscreen: () => void
}

const iconProps = { size: 14 }

const EditorToolbar = ({ editor, dark, onToggleDark, isFullscreen, onToggleFullscreen }: Props) => {
  const btn =
    'p-2 rounded bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'

  const addImage = () => {
    const url = window.prompt('Image URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = window.prompt('Link URL')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const [showTextColors, setShowTextColors] = useState(false)
  const [showHighlightColors, setShowHighlightColors] = useState(false)

  return (
    <div className="flex flex-wrap gap-2 border-b p-2 bg-slate-100 dark:bg-slate-900">
      <button className={btn} title="Bold" onClick={() => editor.chain().focus().toggleBold().run()}>{FaBold(iconProps)}</button>
      <button className={btn} title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}>{FaItalic(iconProps)}</button>
      <button className={btn} title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()}>{FaUnderline(iconProps)}</button>
      <button className={btn} title="Strike" onClick={() => editor.chain().focus().toggleStrike().run()}>{FaStrikethrough(iconProps)}</button>
      <button className={btn} title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()}>{FaListUl(iconProps)}</button>
      <button className={btn} title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()}>{FaListOl(iconProps)}</button>
      <button className={btn} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>{FaHeading(iconProps)}</button>
      <button className={btn} title="Quote" onClick={() => editor.chain().focus().toggleBlockquote().run()}>{FaQuoteRight(iconProps)}</button>

      <div className="relative">
        <button className={btn} onClick={() => setShowHighlightColors(prev => !prev)} title="Highlight color">🖍</button>
        {showHighlightColors && (
          <div className="absolute top-full mt-2 bg-white dark:bg-slate-800 border rounded shadow p-2 flex flex-col gap-1 z-50">
            {HIGHLIGHT_COLORS.map(color => (
              <button
                key={color}
                className="w-6 h-6 rounded"
                style={{ backgroundColor: color }}
                onClick={() => { editor.chain().focus().toggleHighlight({ color }).run(); setShowHighlightColors(false) }}
              />
            ))}
            <button className="text-xs text-slate-500 mt-1" onClick={() => { editor.chain().focus().unsetHighlight().run(); setShowHighlightColors(false) }}>Clear</button>
          </div>
        )}
      </div>

      <div className="relative">
        <button className={btn} onClick={() => setShowTextColors(prev => !prev)} title="Text color">🎨</button>
        {showTextColors && (
          <div className="absolute top-full mt-2 bg-white dark:bg-slate-800 border rounded shadow p-2 flex flex-col gap-1 z-50">
            {TEXT_COLORS.map(color => (
              <button
                key={color}
                className="w-6 h-6 rounded"
                style={{ backgroundColor: color }}
                onClick={() => { editor.chain().focus().setColor(color).run(); setShowTextColors(false) }}
              />
            ))}
            <button className="text-xs text-slate-500 mt-1" onClick={() => { editor.chain().focus().unsetColor().run(); setShowTextColors(false) }}>Clear</button>
          </div>
        )}
      </div>

      <button className={btn} title="Left" onClick={() => editor.chain().focus().setTextAlign('left').run()}>{FaAlignLeft(iconProps)}</button>
      <button className={btn} title="Center" onClick={() => editor.chain().focus().setTextAlign('center').run()}>{FaAlignCenter(iconProps)}</button>
      <button className={btn} title="Right" onClick={() => editor.chain().focus().setTextAlign('right').run()}>{FaAlignRight(iconProps)}</button>
      <button className={btn} title="Justify" onClick={() => editor.chain().focus().setTextAlign('justify').run()}>{FaAlignJustify(iconProps)}</button>
      <button className={btn} title="Code" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{FaCode(iconProps)}</button>
      <button className={btn} title="" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>{FaEraser(iconProps)}</button>
      <button className={btn} title="Superscript" onClick={() => editor.chain().focus().toggleSuperscript().run()}>{FaSuperscript(iconProps)}</button>
      <button className={btn} title="Subscript" onClick={() => editor.chain().focus().toggleSubscript().run()}>{FaSubscript(iconProps)}</button>
      <button className={btn} title="Link" onClick={addLink}>{FaLink(iconProps)}</button>
      <button className={btn} title="Image" onClick={addImage}>{FaImage(iconProps)}</button>
      <button className={btn} title="Undo" onClick={() => editor.chain().focus().undo().run()}>{FaUndo(iconProps)}</button>
      <button className={btn} title="Redo" onClick={() => editor.chain().focus().redo().run()}>{FaRedo(iconProps)}</button>
      <button className={btn} onClick={onToggleFullscreen} title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
        {isFullscreen ? FaCompress(iconProps) : FaExpand(iconProps)}
      </button>
      <button className={btn} title="Theme" onClick={onToggleDark}>{dark ? '☀️' : '🌙'}</button>
      <button
        className={btn}
        title="Save as HTML"
        onClick={() => {
          const html = editor.getHTML()
          const styledHtml = getStyledHTML(html)
          downloadFile('document.html', styledHtml, 'text/html')
        }}
      >
        💾
      </button>
    </div>
  )
}

export default EditorToolbar
