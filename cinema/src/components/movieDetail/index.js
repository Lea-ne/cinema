import React, { useEffect, useState } from "react";

export default function MovieDetail(props) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [showAllActors, setShowAllActors] = useState(false);

  //lien avec api
  useEffect(() => {
    // Vérifiez si le film est disponible
    if (props.movie) {
      // Récupérez les détails du film depuis l'API TMDb
      fetch(
        `https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&append_to_response=credits`
      )
        .then((response) => response.json())
        .then((data) => {
          setMovieDetails(data);
        })
        .catch((error) => console.error("Error fetching movie details:", error));
    }
  }, [props.movie]);


  //fonction
  console.log(movieDetails);

  const handleSeeMoreClick = () => {
    setShowAllActors(!showAllActors);
  };



  //affichage

  return (
    <div>
      {movieDetails ? (
        <div>

          <p>Title: {movieDetails.title}</p>

          <p>Année: {movieDetails.release_date ? new Date(movieDetails.release_date).getFullYear() : "N/A"}</p>
          
          {movieDetails.credits.crew && movieDetails.credits.crew.length > 0 && 
          (<p>Réalisateur: {movieDetails.credits.crew.find((person) => person.job === "Director")?.name || "N/A"}</p>)}
          
          <p>Description : {movieDetails.overview}</p>

          <p>Description : {movieDetails.runtime} mins</p>
          

          {movieDetails.credits.cast && movieDetails.credits.cast.length > 0 && (
            <div>
              <p>Acteurs:</p>
              <ul>
                {showAllActors
                  ? movieDetails.credits.cast.map((actor) => <li key={actor.id}>{actor.name}</li>)
                  : movieDetails.credits.cast.slice(0, 5).map((actor) => <li key={actor.id}>{actor.name}</li>)}
              </ul>
              {movieDetails.credits.cast.length > 5 && (
                <button onClick={handleSeeMoreClick}>{showAllActors ? "Show Less" : "See More"}</button>
              )}
            </div>
          )}

            <ul> 
                {movieDetails.genres.map((genre) => (<li key={genre.id}>{genre.name}</li> ))}
            </ul>
            

            {movieDetails.poster_path && (<img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />)}

            <iframe src={`https://video.tmdb.org/${movieDetails.videos}`}></iframe>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
