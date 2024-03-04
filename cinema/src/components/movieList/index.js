import React from "react";
import MovieCard from "../movieCard";
import MovieDetail from "../movieDetail";
import movieData from "../../data/starswars.json"

export default function MovieList(props){
    const movies = movieData.movies;
    
    const [selectedMovie, setSelectedMovie] = React.useState(null);

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




/*plus tard our api
export default function MovieList(props) {
    const { movieNames } = props;
  
    return (
      <div>
        {movieNames.map((movieName, index) => (
          <MovieCard key={index} name={movieName} />
        ))}
      </div>
    );
  }
  */