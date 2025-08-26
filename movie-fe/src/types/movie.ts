// define the Movie shape our UI expects
export type Movie = {
    // numeric id to uniquely identify the movie
    id: number
    // title of the movie
    title: string
    // short description or tagline
    overview: string
    // ISO date string for release
    release_date: string
    // optional poster path (TMDB-like)
    poster_path?: string
    // average rating (0..10)
    vote_average?: number
    // array of numeric genre ids for filtering
    genre_ids?: number[]
  }
  
  // shape of a cast member for detail modal
  export type CastMember = {
    // unique id
    id: number
    // actor name
    name: string
    // optional character name
    character?: string
  }
  
  // define a Genre type for our filter list
  export type Genre = {
    // numeric id
    id: number
    // display name (e.g., "Action")
    name: string
  }  