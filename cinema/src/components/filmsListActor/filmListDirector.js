// Director

import React from "react";
import { Link } from 'react-router-dom';

export default function FilmListDirector({ movieCredits }) {
  
  
  const filmListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '16px',
    listStyle: 'none',
  };

  const filmItemStyle = {
    textAlign: 'center',
  };

  const imgStyle = {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '6px'
  };


  return (
    <div>
      {movieCredits && movieCredits.cast && movieCredits.cast.length > 0 && (
        <div>
          <p>Films dans lesquels il/elle a réalisé :</p>
          <ul style={filmListStyle}>
            {movieCredits.crew.slice(0, 10).map((movie) => (
              <li key={movie.id} style={filmItemStyle}>
                <Link to={`/movie/${movie.id}`}>
                  <div>
                    <img style={imgStyle} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>
                    {movie.title}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

  