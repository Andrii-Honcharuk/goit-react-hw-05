// src/components/App.jsx

import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import MovieReviews from "../MovieReviews/MovieReviews";
import MovieCast from "../MovieCast/MovieCast";
// import HomePage from "../../pages/HomePage/HomePage";
// import MoviesPage from "../../pages/MoviesPage/MoviesPage";
// import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
// import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

export const App = () => {
  return (
    <div>
      <Navigation />
      <h1></h1>
      <Suspense fallback={<div>Loading.......</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
