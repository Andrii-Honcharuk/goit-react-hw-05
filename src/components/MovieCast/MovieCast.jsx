import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCreditsById } from "../../films-api";

import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieCastById() {
      try {
        // setIsLoading(true);
        const data = await getMovieCreditsById(movieId);
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
    <ul className={css.list}>
      {cast.length > 0 &&
        cast.map(({ id, name, profile_path, character }) => (
          <li key={id} className={css.listItem}>
            <div>
              <img
                className={css.castImage}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"
                }
                width={180}
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
