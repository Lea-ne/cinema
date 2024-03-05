import React from "react";
import MovieList from "../components/movieList";


export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <p>Discover Trendy movie</p>
      <MovieList  categorie="discover"></MovieList>
      <p>Best graded movie</p>
      <MovieList  categorie="goodGrade"></MovieList>
    </div>
  );
}