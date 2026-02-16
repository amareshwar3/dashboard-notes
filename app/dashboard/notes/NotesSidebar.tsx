'use client'

export type FilterType = 'my-private' | 'my-public' | 'other-public'

export default function NotesSidebar({
  active,
  setActive,
}: {
  active: FilterType
  setActive: (f: FilterType) => void
}) {
  return (
    <div className="w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-6 space-y-4">

      <h2 className="text-lg font-semibold mb-6">
        Notes Sections
      </h2>

      <SidebarButton
        label="My Private Notes"
        active={active === 'my-private'}
        onClick={() => setActive('my-private')}
      />

      <SidebarButton
        label="My Public Notes"
        active={active === 'my-public'}
        onClick={() => setActive('my-public')}
      />

      <SidebarButton
        label="Other Public Notes"
        active={active === 'other-public'}
        onClick={() => setActive('other-public')}
      />
    </div>
  )
}

function SidebarButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl transition font-medium ${
        active
            ? 'bg-indigo-600 text-white'
            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
        }`}
    >
      {label}
    </button>
  )
}
