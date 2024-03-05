import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';



export default function Realisateur() {
  const { name } = useParams();
  const [realisateurDetails, setRealisateurDetails] = useState(null);
  const [filmsRealisateur, setFilmsRealisateur] = useState([]);

  console.log(realisateurDetails);

  useEffect(() => {
    const fetchRealisateurDetails = async () => {
      try {
        // Recherche de personnes par nom (pour obtenir l'ID du réalisateur)
        const searchResponse = await fetch(
          `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${encodeURIComponent(name)}`
        );

        if (!searchResponse.ok) {
          throw new Error("Erreur lors de la recherche du réalisateur");
        }

        const searchData = await searchResponse.json();

        // Si des résultats sont trouvés, obtenir les détails du premier réalisateur
        if (searchData.results && searchData.results.length > 0) {
          const realisateurId = searchData.results[0].id;

          const detailsResponse = await fetch(
            `https://api.themoviedb.org/3/person/${realisateurId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
          );

          if (!detailsResponse.ok) {
            throw new Error("Erreur lors de la récupération des détails du réalisateur");
          }

          const detailsData = await detailsResponse.json();
          setRealisateurDetails(detailsData);

          // Récupérer les films réalisés par le réalisateur
          const creditsResponse = await fetch(
            `https://api.themoviedb.org/3/person/${realisateurId}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
          );

          if (!creditsResponse.ok) {
            throw new Error("Erreur lors de la récupération des films du réalisateur");
          }

          const creditsData = await creditsResponse.json();
          const filmsRealises = creditsData.crew.filter((credit) => credit.job === "Director");
          setFilmsRealisateur(filmsRealises);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du réalisateur :", error);
      }
    };

    fetchRealisateurDetails();
  }, [name]);

  return (
    <div>
      {realisateurDetails && (
        <div>
          <h1>{realisateurDetails.name}</h1>
          <p>Biographie : {realisateurDetails.biography}</p>
          <h2>Films réalisés par {realisateurDetails.name}</h2>
          <ul>
            {filmsRealisateur.map((film) => (
              <li key={film.id}>
                <Link to={`/movie-detail/${film.id}`}>{film.title}</Link>
              </li>
            ))}
          </ul>
          {realisateurDetails.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${realisateurDetails.profile_path}`}
              alt={realisateurDetails.name}
            />
          )}
        </div>
      )}
    </div>
  );
}
