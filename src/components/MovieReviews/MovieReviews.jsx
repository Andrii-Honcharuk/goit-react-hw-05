import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviewsById } from "../../films-api";

import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieReviewsById() {
      try {
        // setIsLoading(true);
        const data = await getMovieReviewsById(movieId);
        setReviews(data);
      } catch (error) {
        // setError(true);
        console.error("Error fetching movie reviews:", error);
      } finally {
        // setIsLoading(false);
      }
    }
    fetchMovieReviewsById();
  }, [movieId]);

  return (
    <div>
      <p className={css.error}>
        {reviews &&
          reviews.results &&
          reviews.results.length === 0 &&
          "Sorry we don't have any reviews"}
      </p>
      <ul className={css.list}>
        {reviews &&
          reviews.results &&
          reviews.results.length > 0 &&
          reviews.results.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p dangerouslySetInnerHTML={{ __html: review.content }} />
            </li>
          ))}
      </ul>
    </div>
  );
}
