// import the Movie type for props
import type { Movie } from '../types/movie'
// poster helper to construct image urls
import { posterUrl } from '../models/image'

// define props: movie + handler to open details
type Props = {
  // the movie to display
  movie: Movie
  // optional click handler
  onOpen?: () => void
}

// export the card component
export default function MovieCard({ movie, onOpen }: Props) {
  // render a card with image and basic meta
  return (
    <button
      onClick={onOpen}
      className="group text-left rounded-2xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700 hover:shadow-soft transition overflow-hidden"
    >
      {/* movie poster */}
      <img
        src={posterUrl(movie.poster_path)}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover"
      />
      {/* textual meta */}
      <div className="p-3">
        {/* title with tight line-height */}
        <div className="font-semibold leading-tight">{movie.title}</div>
        {/* release date in subdued tone */}
        <div className="text-xs text-gray-500 dark:text-neutral-400 mt-1">{movie.release_date}</div>
        {/* optional rating badge */}
        {typeof movie.vote_average === 'number' && (
          <div className="mt-2 inline-flex items-center gap-1 text-xs text-amber-600">
            {/* simple star glyph + fixed 1 decimal */}
            ★ {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>
    </button>
  )
}
