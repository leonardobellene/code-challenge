import React from "react";
import { Movie } from "../../types";

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelectMovie }) => {
  return (
    <li
      className="p-4 border rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100 transition"
      onClick={() => onSelectMovie(movie)}
      tabIndex={0}
      role="listitem"
      aria-labelledby={`movie-${movie.tconst}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelectMovie(movie);
        }
      }}
    >
      <p id={`movie-${movie.tconst}`} className="text-lg font-semibold text-indigo-800">
        {movie.title} {movie.year ? `(${movie.year})` : ""}
      </p>
      <p className="text-sm text-gray-600">
        {(movie.genre || "").split(",").join(" / ")}
      </p>
      {movie.average_rating && (
        <p className="text-sm text-yellow-500 font-semibold">
          ⭐ {movie.average_rating}
        </p>
      )}
    </li>
  );
};

export default MovieCard;
