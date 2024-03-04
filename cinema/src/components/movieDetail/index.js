// MovieDetail.js
import React from "react";

export default function MovieDetail(props){
    const movie = props.movie;

    return (
        <div>
            <p>Title: {movie.title}</p>
            <p>Réalisateur: {movie.realisateur}</p>
            <p>Année: {movie.year}</p>
        </div>
    );
}