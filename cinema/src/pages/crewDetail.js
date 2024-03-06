import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import FilmListActor from "../components/filmsListActor/filmListActor";
import FilmListDirector from "../components/filmsListActor/filmListDirector";

export default function CrewDetail(props) {
  const { personId } = useParams();
  const [personDetails, setPersonDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);

 console.log(movieCredits);

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };



  useEffect(() => {
    if (personId) {
      // Récupérez les détails de la personne depuis l'API TMDb
      fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`)
        .then((response) => response.json())
        .then((data) => {
          setPersonDetails(data);
        })
        .catch((error) => console.error("Error fetching person details:", error));

      // Récupérez les crédits de films de la personne depuis l'API TMDb
      fetch(`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`)
        .then((response) => response.json())
        .then((data) => {
          setMovieCredits(data);
        })
        .catch((error) => console.error("Error fetching person movie credits:", error));
    }
  }, [personId]);

  return (
    <div>
      {personDetails ? (
        <div>
          <h1>{personDetails.name}</h1>
          <p>Biographie: {personDetails.biography}</p>
          <p>Métier : {personDetails.known_for_department}</p>
          <p>Age : {calculateAge(personDetails.birthday)} years old ({personDetails.birthday})</p>

          
          {personDetails.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${personDetails.profile_path}`}
              alt={personDetails.name}
            />
          )}


          {personDetails.known_for_department === 'Directing' ? (
            <div>
                <FilmListDirector movieCredits={movieCredits} />
                <FilmListActor movieCredits={movieCredits} />
            </div>
          ) : (
            <div>
                <FilmListActor movieCredits={movieCredits} />
                <FilmListDirector movieCredits={movieCredits} />
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
