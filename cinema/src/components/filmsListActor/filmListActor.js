//Actor

import React from "react";
import { Link } from 'react-router-dom';

export default function FilmListActor({ movieCredits }) {
  return (
    <div>
      {movieCredits && movieCredits.cast && movieCredits.cast.length > 0 && (
        <div>
          <p>Films dans lesquels il/elle a joué :</p>
          <ul>
            {movieCredits.cast.slice(0, 10).map((movie) => (
              <li key={movie.id}>
                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

