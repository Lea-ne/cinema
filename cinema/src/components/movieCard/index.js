// MovieCard.js
import React from "react";

export default function MovieCard(props){
    const handleClick = () => {
        // Appeler une fonction de gestion du clic avec les informations du film
        props.onMovieClick(props.movie);
    };

    return (
        <div onClick={handleClick}>
            <h1>Nom du film : {props.movie.title}</h1>
        </div>
    );
}