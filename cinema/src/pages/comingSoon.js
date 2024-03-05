import React from "react";
import MovieList from "../components/movieList";


export default function ComingSoon() {
    return (
      <div>
        <h1>Comming soon</h1>
        <MovieList categorie="coming-soon" />
      </div>
    );
  }