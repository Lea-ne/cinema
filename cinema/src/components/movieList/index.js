// MovieList.js
import React, { useState, useEffect } from "react";
import MovieCard from "../movieCard";
import MovieDetail from "../movieDetail";
import { fetchMovies } from "../../data/connexionApi";

export default function MovieList(props){
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState(null);

  useEffect(() => {
    const fetchMoviesData = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData || []); // Utiliser un tableau vide si moviesData est undefined
    };
  
    fetchMoviesData();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      {selectedMovie ? (
        <MovieDetail movie={selectedMovie} />
      ) : (
        <div>
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} onMovieClick={handleMovieClick} />
          ))}
        </div>
      )}
    </div>
  );
}
