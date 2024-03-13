import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviewsById } from "../../films-api";

export default function MovieReviews() {
  const { movieId } = useParams();

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [reviews, setReviews] = useState(false);
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

  console.log("Reviews", reviews.results);
  return (
    <div>
      {reviews?.results?.length === 0 && "Sorry we don't have any reviews"}
      <ul>
        {reviews.results &&
          reviews.results.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              {/* {review.content} */}
              <p dangerouslySetInnerHTML={{ __html: review.content }} />
            </li>
          ))}
      </ul>
    </div>
  );
}
