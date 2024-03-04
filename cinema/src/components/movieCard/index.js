// MovieCard.js
import React from "react";
import './movieCard.css';

export default function MovieCard(props){
    const handleClick = () => {
        // Appeler une fonction de gestion du clic avec les informations du film
        props.onMovieClick(props.movie);
    };

    return (
        <div className="card" onClick={handleClick}>
            <img src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`} alt={props.movie.title} />
            <p>{props.movie.title}</p>
        </div>
    );
}