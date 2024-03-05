//Connexion API


//Fetch film actuelle
export const fetchTrendyMovie = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    );
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error('Error fetching trendy movies:', error.message); 
    return [];
  }
  
};


// pour le moment inutile
//Fetch film qui vont sortir
export const fetchComingSoon = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    );
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error('Error fetching Up comming movies:', error.message); 
    return [];
  }
  
};


//Fetch film très bien notés
export const fetchGoodGradeMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    );
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error('Error fetching top graded movies:', error.message); 
    return [];
  }
  
};

