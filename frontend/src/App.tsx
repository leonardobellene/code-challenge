import React, { useEffect, useState, lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import { Movie, Principal, Name } from "./types";
import {
  fetchMovies,
  fetchNames,
  fetchPrincipals,
} from "./services/apiService";

// Lazy Load MovieDetails to improve initial load performance
const MovieDetails = lazy(() => import("./components/MovieDetails"));

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [principals, setPrincipals] = useState<Principal[]>([]);
  const [names, setNames] = useState<Name[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loadingMovies, setLoadingMovies] = useState<boolean>(true);

  useEffect(() => {
    const loadMoviesAndNames = async () => {
      // Fetch movies & names in parallel for better performance
      const [moviesData, namesData] = await Promise.all([
        fetchMovies(),
        fetchNames(),
      ]);
      setMovies(moviesData);
      setNames(namesData);
      setLoadingMovies(false);
    };
    loadMoviesAndNames();
  }, []);

  useEffect(() => {
    const loadPrincipals = async () => {
      if (selectedMovie) {
        const principalsData = await fetchPrincipals(selectedMovie.tconst);
        setPrincipals(principalsData);
      } else {
        setPrincipals([]);
      }
    };
    loadPrincipals();
  }, [selectedMovie]);

  return (
    <div className="relative pb-14 min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-800">
      <Header />
      <main className="flex flex-grow sm:p-4 container mx-auto" role="main">
        {loadingMovies && <p role="status">Loading movies...</p>}
        <MovieList
          movies={movies}
          onSelectMovie={(movie) => setSelectedMovie(movie)}
        />
      </main>

      {selectedMovie && (
        <Suspense
          fallback={<p className="text-center">Loading movie details...</p>}
        >
          <div
            id="movie-details"
            role="dialog"
            aria-labelledby="movie-title"
            aria-describedby="movie-description"
            tabIndex={-1}
            className="outline-none"
          >
            <MovieDetails
              selectedMovie={selectedMovie}
              principals={principals}
              names={names}
              onClose={() => setSelectedMovie(null)}
            />
          </div>
        </Suspense>
      )}
      <Footer />
    </div>
  );
};

export default App;
