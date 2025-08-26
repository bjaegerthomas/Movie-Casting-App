// import types for function signatures (helps swapping to a real backend later)
import type { Movie, CastMember } from '../types/movie'
// import our mock data and “search”
import { popularMock, detailsMock, searchMock } from '../mocks/movies'

// expose a function that simulates fetching popular
export async function getPopular(): Promise<Movie[]> {
  // wait a touch to show skeletons (perceived loading)
  await delay(400)
  // return mock list
  return popularMock
}

// expose a function that simulates searching
export async function searchMovies(q: string): Promise<Movie[]> {
  // tiny delay to trigger skeletons when searching
  await delay(400)
  // return filtered results
  return searchMock(q)
}

// expose a function to fetch one movie + credits
export async function getMovie(id: number): Promise<{ movie: Movie; credits: CastMember[] } | null> {
  // tiny delay for realism
  await delay(300)
  // return the details bundle or null if missing
  return detailsMock[id] ?? null
}

// small helper to await ms
const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
