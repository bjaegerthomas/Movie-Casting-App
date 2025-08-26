// import types to keep data consistent with UI needs
import type { Movie, CastMember, Genre } from '../types/movie'

// define a small genre catalog for our chips
export const genres: Genre[] = [
  // action movies
  { id: 28, name: 'Action' },
  // science fiction
  { id: 878, name: 'Sci-Fi' },
  // adventure
  { id: 12, name: 'Adventure' },
  // drama
  { id: 18, name: 'Drama' },
]

// build a quick lookup map (id -> name) for display if needed
export const genreMap = Object.fromEntries(genres.map(g => [g.id, g.name]))

// a small, curated set of popular movies (mocked)
export const popularMock: Movie[] = [
  // original Star Wars
  {
    id: 11,
    title: 'Star Wars',
    overview: 'Luke Skywalker joins forces to save the galaxy.',
    release_date: '1977-05-25',
    poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
    vote_average: 8.2,
    genre_ids: [28, 12, 878],
  },
  // Inception favorite
  {
    id: 27205,
    title: 'Inception',
    overview: 'A thief infiltrates dreams to steal secrets.',
    release_date: '2010-07-16',
    poster_path: '/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
    vote_average: 8.4,
    genre_ids: [878, 18, 28],
  },
  // Interstellar to have more variety
  {
    id: 157336,
    title: 'Interstellar',
    overview: 'Explorers travel through a wormhole in space to ensure humanity’s survival.',
    release_date: '2014-11-07',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    vote_average: 8.3,
    genre_ids: [12, 18, 878],
  },
]

// details + credits for modal (id -> details)
export const detailsMock: Record<number, { movie: Movie; credits: CastMember[] }> = {
  // Inception details
  27205: {
    movie: popularMock.find(m => m.id === 27205)!,
    credits: [
      { id: 1, name: 'Leonardo DiCaprio', character: 'Cobb' },
      { id: 2, name: 'Joseph Gordon-Levitt', character: 'Arthur' },
      { id: 3, name: 'Elliot Page', character: 'Ariadne' },
    ],
  },
  // Star Wars details
  11: {
    movie: popularMock.find(m => m.id === 11)!,
    credits: [
      { id: 4, name: 'Mark Hamill', character: 'Luke Skywalker' },
      { id: 5, name: 'Harrison Ford', character: 'Han Solo' },
      { id: 6, name: 'Carrie Fisher', character: 'Princess Leia' },
    ],
  },
  // Interstellar details
  157336: {
    movie: popularMock.find(m => m.id === 157336)!,
    credits: [
      { id: 7, name: 'Matthew McConaughey', character: 'Cooper' },
      { id: 8, name: 'Anne Hathaway', character: 'Brand' },
      { id: 9, name: 'Jessica Chastain', character: 'Murph' },
    ],
  },
}

// function to fake a search by title (case-insensitive)
export const searchMock = (q: string): Movie[] => {
  // normalize the query
  const term = q.trim().toLowerCase()
  // empty query returns popular
  if (!term) return popularMock
  // otherwise filter on title
  return popularMock.filter(m => m.title.toLowerCase().includes(term))
}
