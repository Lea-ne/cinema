import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

export default function Actor() {
    const { name } = useParams();
    const [actorDetails, setActorDetails] = useState(null);

    console.log(actorDetails);


    useEffect(() => {
        const fetchActorDetails = async () => {
          try {
            // Recherche de personnes par nom (pour obtenir l'ID du réalisateur)
            const searchResponse = await fetch(
              `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${encodeURIComponent(name)}`
            );
    
            if (!searchResponse.ok) {
              throw new Error("Erreur lors de la recherche de l'acteur");
            }
    
            const searchData = await searchResponse.json();
    
            // Si des résultats sont trouvés, obtenir les détails du premier réalisateur
            if (searchData.results && searchData.results.length > 0) {
              const actorId = searchData.results[0].id;
    
              const detailsResponse = await fetch(
                `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
              );
    
              if (!detailsResponse.ok) {
                throw new Error("Erreur lors de la récupération des détails du réalisateur");
              }
    
              const detailsData = await detailsResponse.json();
              setActorDetails(detailsData);
    
              
            }
          } 
            catch (error) {
            console.error("Erreur lors de la récupération des détails du réalisateur :", error);
          }
        };
    
        fetchActorDetails();
      }, [name]);



      return (
        <div>
           {actorDetails && (
            <div>
                <h1>{actorDetails.name}</h1>
                <p>Biography : {actorDetails.biography}</p>
                <p> Métier : {actorDetails.known_for_department}</p>
                <p> Métier : {actorDetails.place_of_birth}</p>
                <p> Age : {actorDetails.birthday}</p> 
                {actorDetails.profile_path && (
                <img
                src={`https://image.tmdb.org/t/p/w500/${actorDetails.profile_path}`}
                alt={actorDetails.name}
                />
          )}
            </div>
            )}
        </div>
      );

}