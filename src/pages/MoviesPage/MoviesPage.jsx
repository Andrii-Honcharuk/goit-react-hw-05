import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { getMovieByName } from "../../films-api";
import { useEffect } from "react";

import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  // const [page, setPage] = useState(1);
  const [query, setQuery] = useSearchParams();
  const [movies, setMovies] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [isLoadMore, setIsLoadMore] = useState(false);

  const movieFilter = query.get("films") ?? "";

  // const notifyEmpty = () => toast.error("Please enter a value in the field");

  useEffect(() => {
    if (movieFilter === "") {
      return;
    }
    async function searchMovies() {
      try {
        // setMovies([]);
        const data = await getMovieByName(movieFilter);
        setMovies(data.results);
        // setIsLoadMore(data.total_pages > page);
      } catch (error) {
        console.error(error);
      } finally {
        // console.log("MP-results", movies);
      }
    }
    searchMovies();
  }, [movieFilter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setPage(1);
    setMovies([]);

    const formData = new FormData(e.target);
    const searchQuery = formData.get("query");
    if (searchQuery.trim() === "") {
      alert("Please enter a value in the field");
    } else {
      query.set("films", searchQuery.trim());
      setQuery(query);
    }
  };

  return (
    <div className={css.mpContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          defaultValue={movieFilter}
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <MovieList movies={movies} />
      </div>
      {/* {isLoadMore && !isLoading && <LoadMore onClick={handleLoadMore} />} */}
    </div>
  );
}
