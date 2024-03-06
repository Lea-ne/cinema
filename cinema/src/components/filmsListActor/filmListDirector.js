// Director

import React from "react";
import { Link } from 'react-router-dom';

export default function FilmListDirector({ movieCredits }) {
    return (
      <div>
        {movieCredits && movieCredits.crew && movieCredits.crew.length > 0 && (
          <div>
            <p>Films qu'il/elle a dirigés :</p>
            <ul>
              {movieCredits.crew.slice(0, 10).map((movie) => (
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
  