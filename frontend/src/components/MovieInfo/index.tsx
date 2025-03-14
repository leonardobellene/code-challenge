import React from "react";
import { Movie } from "../../types";
import { formatRuntime } from "../../utils";

interface MovieInfoProps {
  selectedMovie: Movie;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ selectedMovie }) => {
  return (
    <div className="text-sm text-gray-600 mt-2">
      {selectedMovie.runtime && (
        <p>Runtime: {formatRuntime(selectedMovie.runtime)}</p>
      )}
      {selectedMovie.genre && (
        <p>Genre: {(selectedMovie.genre || "").split(",").join(" / ")}</p>
      )}
      {selectedMovie.average_rating && selectedMovie.num_votes && (
        <p>
          ⭐ {selectedMovie.average_rating} ({selectedMovie.num_votes} votes)
        </p>
      )}
    </div>
  );
};

export default MovieInfo;
