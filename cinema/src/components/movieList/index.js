// MovieList.js
import React, { useState, useEffect } from "react";
import MovieCard from "../movieCard";
import MovieDetail from "../movieDetail";
import { fetchMovies } from "../../data/connexionApi";
import './movieList.css';

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
    <div className="movie-grid">
      {selectedMovie ? (<MovieDetail movie={selectedMovie} />) : (
        <div>
          {movies.map((movie, index) => (
            <MovieCard className="movieCard" key={index} movie={movie} onMovieClick={handleMovieClick} />
          ))}
        </div>
      )}
    </div>
  );
}
