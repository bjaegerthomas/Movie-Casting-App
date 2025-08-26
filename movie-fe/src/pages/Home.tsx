// import React hooks for state and lifecycle
import { useEffect, useMemo, useState } from 'react'
// bring in our header with toggle
import Header from '../components/Header'
// search bar component
import SearchBar from '../components/SearchBar'
// genre filter chip bar
import GenreFilter from '../components/GenreFilter'
// movie card for results
import MovieCard from '../components/MovieCard'
// modal for details
import Modal from '../components/Modal'
// skeleton cards for loading state
import SkeletonCard from '../components/SkeletonCard'
// types to annotate our state
import type { Movie, CastMember } from '../types/movie'
// service calls (mocked)
import { getPopular, searchMovies, getMovie } from '../services/api'
// helper to build poster URL
import { posterUrl } from '../models/image'
// genre map (optional, for future enhancements)
import { genres } from '../mocks/movies'

// export the main page
export default function Home() {
  // show/hide skeletons while loading
  const [loading, setLoading] = useState(true)
  // the full list of movies from service
  const [movies, setMovies] = useState<Movie[]>([])
  // current selection for modal (movie + credits)
  const [selected, setSelected] = useState<{ movie: Movie; credits: CastMember[] } | null>(null)
  // selected genres by id (for filter chips)
  const [activeGenres, setActiveGenres] = useState<number[]>([])

  // on mount, fetch “popular” list
  useEffect(() => {
    // define an async IIFE to call service
    ;(async () => {
      setLoading(true)
      try {
        // fetch the mock popular list
        const data = await getPopular()
        // store it in state
        setMovies(data)
      } finally {
        // stop showing skeletons
        setLoading(false)
      }
    })()
    // empty dependency: run once on mount
  }, [])

  // callback for SearchBar → triggers a query
  const doSearch = async (q: string) => {
    // show skeletons
    setLoading(true)
    try {
      // fetch mock search results
      const data = await searchMovies(q)
      // update the movie list
      setMovies(data)
      // clear any active genre filters (optional UX)
      setActiveGenres([])
    } finally {
      // hide skeletons
      setLoading(false)
    }
  }

  // open the detail modal for a movie
  const openMovie = async (m: Movie) => {
    // call service to get details+credits
    const data = await getMovie(m.id)
    // if we got data, show it
    if (data) setSelected(data)
  }

  // toggle a genre id in/out of active list
  const toggleGenre = (id: number) => {
    // compute next selection array
    setActiveGenres((prev) =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  // compute the filtered list based on activeGenres
  const filteredMovies = useMemo(() => {
    // if no active filters, show all
    if (activeGenres.length === 0) return movies
    // otherwise include movies that contain ALL active genres
    const set = new Set(activeGenres)
    return movies.filter(m => {
      const list = m.genre_ids ?? []
      return [...set].every(id => list.includes(id))
    })
  }, [movies, activeGenres])

  // render page layout
  return (
    <div className="min-h-screen">
      {/* top header with theme toggle */}
      <Header />
      {/* main content container */}
      <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
        {/* search bar row */}
        <SearchBar onSearch={doSearch} />
        {/* genre filter chips (show even while loading for better UX) */}
        <GenreFilter selected={activeGenres} onToggle={toggleGenre} />

        {/* results */}
        {loading ? (
          // skeleton grid (fixed count to keep layout stable)
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredMovies.length === 0 ? (
          // empty state when no results
          <div className="text-sm text-gray-500 dark:text-neutral-400">
            No movies match your filters. Try clearing some genres or search again.
          </div>
        ) : (
          // grid of movie cards
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredMovies.map((m) => (
              <MovieCard key={m.id} movie={m} onOpen={() => openMovie(m)} />
            ))}
          </div>
        )}
      </main>

      {/* detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {/* only render content if selected exists */}
        {selected && (
          <div className="p-4 sm:p-6">
            {/* layout: poster + meta */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* poster image */}
              <img
                src={posterUrl(selected.movie.poster_path, 'w500')}
                alt={selected.movie.title}
                className="w-40 sm:w-48 rounded-xl"
              />
              {/* text column */}
              <div>
                {/* title */}
                <h2 className="text-xl font-semibold">{selected.movie.title}</h2>
                {/* release date */}
                <div className="text-sm text-gray-500 dark:text-neutral-400">{selected.movie.release_date}</div>
                {/* overview */}
                <p className="mt-3 text-sm text-gray-700 dark:text-neutral-300">{selected.movie.overview}</p>
                {/* credits */}
                <h3 className="mt-4 font-semibold">Top Cast</h3>
                <ul className="mt-1 text-sm text-gray-700 dark:text-neutral-300 list-disc list-inside">
                  {selected.credits.slice(0, 8).map(c => (
                    <li key={c.id}>
                      {c.name}{c.character ? ` as ${c.character}` : ''}
                    </li>
                  ))}
                </ul>
                {/* close button */}
                <div className="mt-4">
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-xl border border-gray-300 dark:border-neutral-700 px-4 py-2 hover:shadow-soft"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
