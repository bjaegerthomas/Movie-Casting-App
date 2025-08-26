// import React helpers
import { useMemo } from 'react'
// import genre list/type
import { genres } from '../mocks/movies'
import type { Genre } from '../types/movie'

// define props: selected set + toggle function
type Props = {
  // selected genre IDs
  selected: number[]
  // callback to toggle a genre id
  onToggle: (id: number) => void
}

// export the GenreFilter UI as a set of clickable chips
export default function GenreFilter({ selected, onToggle }: Props) {
  // compute a Set for quick lookup to highlight active chips
  const selectedSet = useMemo(() => new Set(selected), [selected])

  // render a horizontal chip list
  return (
    <div className="flex flex-wrap gap-2">
      {/* map over our small genre catalog */}
      {genres.map((g: Genre) => {
        // determine if this chip is active
        const active = selectedSet.has(g.id)
        // pick base classes
        const base = 'rounded-full border px-3 py-1 text-sm transition'
        // pick variants for active/inactive + dark/light
        const cls = active
          ? `${base} border-transparent bg-gray-900 text-white dark:bg-white dark:text-neutral-900`
          : `${base} border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:shadow-soft`
        // render the chip as a button
        return (
          <button
            key={g.id}
            onClick={() => onToggle(g.id)}
            className={cls}
            title={g.name}
          >
            {g.name}
          </button>
        )
      })}
    </div>
  )
}
