import React, { useState, useEffect, useRef } from "react";
import { Movie } from "../../types";
import SearchBar from "../SearchBar";
import SortDropdown from "../SortDropdown";
import GenreSelector from "../GenreSelector";
import MovieCard from "../MovieCard";

interface MovieListProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onSelectMovie }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("newest");
  const [visibleMovies, setVisibleMovies] = useState(20); // Start with 20 movies
  const loaderRef = useRef<HTMLDivElement>(null);

  // Sort movies based on selected sort option
  const sortedMovies = [...movies].sort((a, b) => {
    const ratingA = a.average_rating ? parseFloat(a.average_rating) : 0;
    const ratingB = b.average_rating ? parseFloat(b.average_rating) : 0;

    switch (sort) {
      case "newest":
        return +b.year - +a.year;
      case "oldest":
        return +a.year - +b.year;
      case "a-z":
        return a.title.localeCompare(b.title);
      case "z-a":
        return b.title.localeCompare(a.title);
      case "highest-rating":
        return ratingB - ratingA;
      case "lowest-rating":
        return ratingA - ratingB;
      default:
        return 0;
    }
  });

  // Filter movies based on selected genres and search term
  const filteredMovies = sortedMovies.filter(
    (movie) =>
      (selectedGenres.length === 0 ||
        selectedGenres.some((genre) =>
          movie.genre?.toLowerCase().includes(genre.toLowerCase())
        )) &&
      (searchTerm === "" ||
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Slice movies to display only the visible ones
  const displayedMovies = filteredMovies.slice(0, visibleMovies);

  // Infinite Scroll Logic: Detect when user reaches the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleMovies < filteredMovies.length
        ) {
          setVisibleMovies((prev) => prev + 20); // Load 20 more movies
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [visibleMovies, filteredMovies.length]);

  return (
    <div className="flex-grow p-4 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-600">Movies</h2>
      <div className="flex flex-wrap justify-between items-center gap-3 my-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SortDropdown sort={sort} setSort={setSort} />
        <GenreSelector
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
      </div>

      <div aria-live="polite">
        <ul
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
          role="list"
        >
          {displayedMovies.map((movie) => (
            <MovieCard
              key={movie.tconst}
              movie={movie}
              onSelectMovie={onSelectMovie}
            />
          ))}
        </ul>
      </div>

      {/* Infinite Scroll Loader */}
      {visibleMovies < filteredMovies.length && (
        <div
          ref={loaderRef}
          className="h-10 flex justify-center items-center mt-6"
        >
          <span className="text-gray-500">Loading more movies...</span>
        </div>
      )}
    </div>
  );
};

export default MovieList;
