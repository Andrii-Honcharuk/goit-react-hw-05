import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { getMovieById } from "../../films-api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [movie, setMovie] = useState(false);

  const location = useLocation();

  const backLinkRef = useRef(location.state ?? "/movies");
  console.log("LOCATION", location.state);
  console.log("REF_linkGoBack", backLinkRef.current);

  useEffect(() => {
    async function fetchMovieById() {
      try {
        // console.log("byID");
        // setIsLoading(true);
        const data = await getMovieById(movieId);
        // console.log("Movie", data);
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
    <>
      <div>
        <h2>MovieDetailsPage: {movie.title}</h2>
        <Link to={backLinkRef.current}>Go back</Link>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
        />
        <p>Overview</p>
        <p>{movie.overview}</p>
        <p>Genres</p>
        <p>
          {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}
        </p>
      </div>
      <div>
        <h3>Details</h3>
        <ul>
          <li>
            <Link to="cast" state={location}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={location}>
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
}
