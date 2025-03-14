import React from "react";
import { Principal, Name, Movie } from "../../types";
import Modal from "../Modal";
import MovieInfo from "../MovieInfo";
import PrincipalsList from "../PrincipalsList";

interface MovieDetailsProps {
  principals: Principal[];
  names: Name[];
  selectedMovie: Movie | null;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  principals,
  names,
  selectedMovie,
  onClose,
}) => {
  if (!selectedMovie) return null;

  return (
    <Modal isOpen={!!selectedMovie} onClose={onClose}>
      <h2 id="movie-title" className="text-2xl font-bold text-indigo-600">
        {selectedMovie.title} {selectedMovie.year && `(${selectedMovie.year})`}
      </h2>
      <MovieInfo selectedMovie={selectedMovie} />
      <PrincipalsList principals={principals} names={names} />
    </Modal>
  );
};

export default MovieDetails;
