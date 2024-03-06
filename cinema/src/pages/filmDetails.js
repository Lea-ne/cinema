import React, { useEffect, useState } from "react";
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Fonction pour obtenir le lien de la personne en fonction du métier ou de l'objet d'acteur
const getPersonLink = (person, movieDetails) => {
  const job = typeof person === "string" ? person : person.job;
  const id = typeof person === "string" ? 
    movieDetails.credits.crew.find((p) => p.job === job)?.id :
    person.id;

  return (
    <Link to={`/crew-detail/${id || "N/A"}`}>
      {typeof person === "string" ? 
        (job === "Director" ? movieDetails.credits.crew.find((p) => p.job === job)?.name : job) :
        person.name || "N/A"
      }
    </Link>
  );
};

export default function MovieDetail(props) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [showAllActors, setShowAllActors] = useState(false);
  const [trailerVideoId, setTrailerVideoId] = useState(null);
  const { id } = useParams();

  // Fonction pour extraire l'identifiant de la vidéo de bande-annonce
  const extractTrailerVideoId = (videoResults) => {
    if (videoResults && videoResults.length > 0) {
      const trailerVideo = videoResults.find((video) => video.type === "Trailer");
      return trailerVideo ? trailerVideo.key : null;
    }
    return null;
  };

  // Effet pour récupérer les détails du film depuis l'API TMDb
  useEffect(() => {
    if (id) {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&append_to_response=credits,videos`
      )
        .then((response) => response.json())
        .then((data) => {
          setMovieDetails(data);

          const trailerVideoId = extractTrailerVideoId(data.videos.results);
          setTrailerVideoId(trailerVideoId);
        })
        .catch((error) => console.error("Error fetching movie details:", error));
    }
  }, [id]);

  // Affichage
  return (
    <div>
      {movieDetails ? (
        <div>
          <p>Title: {movieDetails.title}</p>
          <p>Année: {movieDetails.release_date ? new Date(movieDetails.release_date).getFullYear() : "N/A"}</p>
        
          {movieDetails.credits.crew && movieDetails.credits.crew.length > 0 && (
            <p>Réalisateur: {getPersonLink("Director", movieDetails)}</p>
          )}

          <p>Description : {movieDetails.overview}</p>
          <p>Description : {movieDetails.runtime} mins</p>

          {movieDetails.credits.cast && movieDetails.credits.cast.length > 0 && (
            <div>
              <p>Acteurs:</p>
              <ul>
                {showAllActors
                  ? movieDetails.credits.cast.map((actor) => (
                      <li key={actor.id}>{getPersonLink(actor, movieDetails)}</li>
                    ))
                  : movieDetails.credits.cast.slice(0, 5).map((actor) => (
                      <li key={actor.id}>{getPersonLink(actor, movieDetails)}</li>
                    ))}
              </ul>

              {movieDetails.credits.cast.length > 5 && (
                <button onClick={() => setShowAllActors(!showAllActors)}>
                  {showAllActors ? "Show Less" : "See More"}
                </button>
              )}
            </div>
          )}

          <ul> 
            {movieDetails.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
          </ul>

          {movieDetails.poster_path && (
            <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
          )}

          {trailerVideoId && <YouTube videoId={trailerVideoId} />}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
