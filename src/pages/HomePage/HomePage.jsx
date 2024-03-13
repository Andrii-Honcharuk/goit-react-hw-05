import { useEffect, useState } from "react";
import { getMovies } from "../../films-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const popularMovies = await getMovies();
        console.log(popularMovies.results);
        setMovies(popularMovies.results);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies to day</h1>
      {isLoading && <b>Loading .... </b>}
      {error && <ErrorMessage />}
      <MovieList movies={movies} />
    </div>
  );
}
