import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getMovieCreditsById } from "../../films-api";

export default function MovieCast() {
  const location = useLocation();
  console.log("LOCATION", location);

  const { movieId } = useParams();

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [cast, setCast] = useState(false);
  useEffect(() => {
    async function fetchMovieCastById() {
      try {
        console.log("byID");
        // setIsLoading(true);
        const data = await getMovieCreditsById(movieId);
        console.log("Cast", data);
        setCast(data);
      } catch (error) {
        // setError(true);
      } finally {
        // setIsLoading(false);
      }
    }
    fetchMovieCastById();
  }, [movieId]);

  return (
    <ul>
      {cast &&
        cast.map(({ id, name, profile_path, character }) => (
          <li key={id}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                alt={name}
              />
              <p>{name}</p>
              <p>{character}</p>
            </div>
          </li>
        ))}
    </ul>
  );
}
