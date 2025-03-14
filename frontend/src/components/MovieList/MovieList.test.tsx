import { render, screen, fireEvent } from "@testing-library/react";
import MovieList from "./index";
import { describe, test, expect, vi } from "vitest";
import { Movie } from "../../types";

const mockMovies: Movie[] = [
  {
    tconst: "tt12345",
    title: "Inception",
    original_title: "Inception",
    year: "2010",
    genre: "Sci-Fi",
    runtime: "148",
    average_rating: "8.8",
    num_votes: "2000000,",
  },
  {
    tconst: "tt67890",
    title: "Interstellar",
    original_title: "Interstellar",
    year: "2014",
    genre: "Adventure",
    runtime: "169",
    average_rating: "8.6",
    num_votes: "1800000",
  },
  {
    tconst: "tt11111",
    title: "Dunkirk",
    original_title: "Dunkirk",
    year: "2017",
    genre: "War",
    runtime: "106",
    average_rating: "7.9",
    num_votes: "1500000",
  },
];

describe("MovieList Component", () => {
  test("renders movie list with correct titles", () => {
    render(<MovieList movies={mockMovies} onSelectMovie={vi.fn()} />);

    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
  });

  test("calls onSelectMovie when a movie is clicked", () => {
    const mockOnSelectMovie = vi.fn();
    render(<MovieList movies={mockMovies} onSelectMovie={mockOnSelectMovie} />);

    const movie = screen.getByText(/Inception/i);
    fireEvent.click(movie);

    expect(mockOnSelectMovie).toHaveBeenCalledWith(mockMovies[0]);
  });
});
