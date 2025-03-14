import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <label htmlFor="search-movies" className="sr-only">
        Search movies
      </label>
      <input
        id="search-movies"
        type="text"
        placeholder="Search movies..."
        className="border border-gray-300 rounded-lg px-4 py-2 flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search movies"
      />
    </>
  );
};

export default SearchBar;
