// import useState for controlled input
import { useState } from 'react'

// define props: a callback we call with the query
type Props = { onSearch: (q: string) => void }

// export a search bar component
export default function SearchBar({ onSearch }: Props) {
  // local state for the input value
  const [q, setQ] = useState('')
  // render a form with input and submit button
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        // prevent page reload
        e.preventDefault()
        // trigger the parent callback
        onSearch(q)
      }}
    >
      {/* controlled input for search text */}
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search movies (e.g., Interstellar)"
        className="flex-1 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2 outline-none focus:border-gray-400 dark:focus:border-neutral-600"
      />
      {/* simple button to submit form */}
      <button className="rounded-xl border border-gray-300 dark:border-neutral-700 px-4 py-2 hover:shadow-soft active:scale-[.99] transition">
        Search
      </button>
    </form>
  )
}
