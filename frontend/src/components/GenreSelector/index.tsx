import React, { useState } from "react";
import { GENRES } from "../../constants";

interface GenreSelectorProps {
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({
  selectedGenres,
  setSelectedGenres,
}) => {
  const [showGenreOptions, setShowGenreOptions] = useState(false);

  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prevGenres: string[]) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  // Clear all selected genres
  const clearGenres = () => setSelectedGenres([]);

  return (
    <>
      <button
        className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition min-w-[140px]"
        onClick={() => setShowGenreOptions(!showGenreOptions)}
        aria-expanded={showGenreOptions}
      >
        {showGenreOptions ? "Hide Genres" : "Select Genres"}
      </button>

      {showGenreOptions ? (
        <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-white shadow-md">
          {GENRES.map((genre) => (
            <button
              key={genre}
              className={`border px-3 py-2 rounded-lg transition ${
                selectedGenres.includes(genre)
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => toggleGenre(genre)}
            >
              {genre}
            </button>
          ))}
          <button
            className="border px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            onClick={clearGenres}
          >
            Clear All
          </button>
        </div>
      ) : (
        selectedGenres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedGenres.map((genre) => (
              <button
                key={genre}
                className="border flex justify-around align-center px-3 py-2 rounded-lg transition bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => toggleGenre(genre)}
              >
                {genre} <span className="ml-2">✖</span>
              </button>
            ))}
          </div>
        )
      )}
    </>
  );
};

export default GenreSelector;
