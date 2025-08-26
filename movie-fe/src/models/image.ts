// helper to build a poster URL or fallback to a placeholder
export const posterUrl = (path?: string, size: 'w342'|'w500' = 'w342') =>
    // if path exists, use TMDB-style URL; otherwise show a placeholder image
    path ? `https://image.tmdb.org/t/p/${size}${path}` : 'https://via.placeholder.com/342x513?text=No+Image'
  