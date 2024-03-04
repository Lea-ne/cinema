import React from "react";
import MovieList from "../components/movieList";
import SearchBar from "../components/search";

export default function HomePage() {
  return (
    <div>
      <h1>Landing page</h1>
      <SearchBar></SearchBar>
      <MovieList></MovieList>
    </div>
  );
}