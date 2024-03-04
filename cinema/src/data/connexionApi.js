export const fetchMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    );
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error('Error fetching movies:', error.message); 
    return [];
  }
  
};

console.log(process.env.REACT_APP_TMDB_KEY);
