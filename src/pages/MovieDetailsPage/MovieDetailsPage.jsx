import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieById } from "../../films-api";

import css from "./MovieDetailsPage.module.css";

const makeActiveClass = ({ isActive }) => {
  return `css.link ${isActive && css.isActive}`;
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [movie, setMovie] = useState(false);

  const location = useLocation();

  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchMovieById() {
      try {
        // setIsLoading(true);
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        // setError(true);
      } finally {
        // setIsLoading(false);
      }
    }
    fetchMovieById();
  }, [movieId]);

  return (
    <div className={css.movieDetContainer}>
      <div>
        <h2 className={css.header}>Details about Movie: {movie.title}</h2>
        <Link className={css.goBack} to={backLinkRef.current}>
          Go back
        </Link>
        <div className={css.baseContainer}>
          <img
            className={css.imgMovie}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
          />
          <div>
            <b>Overview:</b>
            <p>{movie.overview}</p>
            <b className={css.genres}>Genres:</b>
            <p>
              {movie.genres &&
                movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
        <h3>Details</h3>
        <ul className={css.listLinks}>
          <li>
            <NavLink to="cast" state={location} className={makeActiveClass}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={location} className={makeActiveClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}
