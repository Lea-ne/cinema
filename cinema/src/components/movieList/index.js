// MovieList.js
import React, { useState, useEffect } from "react";
import MovieCard from "../movieCard";
import MovieDetail from "../movieDetail";
import { fetchTrendyMovie, fetchComingSoon, fetchGoodGradeMovies } from "../../data/connexionApi";
import './movieList.css';

export default function MovieList(props){
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState(null);

  useEffect(() => {
    const fetchMoviesData = async () => {
      let moviesData;

      if (props.categorie === 'discover') {
        moviesData = await fetchTrendyMovie();
      } 
      
      if (props.categorie === 'coming-soon') {
        moviesData = await fetchComingSoon();
      }

      else if (props.categorie === 'goodGrade') {
        moviesData = await fetchGoodGradeMovies();
      }


      setMovies(moviesData || []); // Utiliser un tableau vide si moviesData est undefined
    };
  
    fetchMoviesData();
  }, [props.categorie]);

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

