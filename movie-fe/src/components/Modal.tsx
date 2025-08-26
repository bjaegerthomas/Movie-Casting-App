// import React helpers
import { ReactNode, useEffect } from 'react'

// define props for a simple modal
type Props = { open: boolean; onClose: () => void; children: ReactNode }

// export a portal-less modal (simple overlay)
export default function Modal({ open, onClose, children }: Props) {
  // add ESC key to close when open
  useEffect(() => {
    // define a keydown handler
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    // conditionally attach
    if (open) window.addEventListener('keydown', onKey)
    // cleanup on unmount or when closing
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // when not open, render nothing
  if (!open) return null

  // render an overlay + centered panel
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      onClick={onClose}
    >
      {/* stop clicks inside the panel from bubbling to the overlay */}
      <div
        className="w-full max-w-3xl rounded-2xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
