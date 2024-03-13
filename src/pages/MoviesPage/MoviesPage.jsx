import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { getMovieByName } from "../../films-api";
import { useEffect } from "react";
import LoadMore from "../../components/LoadMoreBtn/LoadMoreBtn";

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useSearchParams();
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const movieFilter = query.get("films") ?? "";

  const location = useLocation();
  console.log("Movie Page LOCATION", location);

  // const notifyEmpty = () => toast.error("Please enter a value in the field");

  // const changeFilmFilter = (newFilter) => {
  //   query.set("films", newFilter);
  //   console.log("MP-query", query);
  //   setQuery(query);
  // };

  useEffect(() => {
    if (movieFilter === "") {
      return;
    }
    async function searchMovies() {
      try {
        // setMovies([]);
        const data = await getMovieByName(movieFilter, page);
        setMovies((prevMovies) => {
          return [...prevMovies, ...data.results];
        });
        console.log("Results", data.results);
        setIsLoadMore(data.total_pages > page);
      } catch (error) {
        console.error(error);
      } finally {
        // console.log("MP-results", movies);
      }
    }
    searchMovies();
  }, [movieFilter, page]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const searchQuery = formData.get("query");
    if (searchQuery.trim() === "") {
      console.log("Empty query");
      // notifyEmpty();
    } else {
      query.set("films", searchQuery.trim());
      setQuery(query);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
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
      {isLoadMore && !isLoading && <LoadMore onClick={handleLoadMore} />}
    </div>
  );
}

/*

 const notifyEmpty = () => toast.error("Please enter a value in the field");
  return (
    <header className={css.headerContainer}>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          if (values.query.trim() === "") {
            notifyEmpty();
          } else {
            onSearch(values.query.trim());
            actions.resetForm();
          }
        }}
      >
        <Form className={css.searchBar}>
          <Field
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
}

*/
