import { render, screen } from "@testing-library/react";
import MovieInfo from "./index";
import { describe, test, expect } from "vitest";
import { Movie } from "../../types";

const mockMovie: Movie = {
  tconst: "tt1375666",
  title: "Inception",
  original_title: "Inception",
  year: "2010",
  genre: "Sci-Fi, Action",
  average_rating: "8.8",
  num_votes: "1000000",
  runtime: "148",
};

describe("MovieInfo Component", () => {
  test("renders movie runtime", () => {
    render(<MovieInfo selectedMovie={mockMovie} />);
    expect(screen.getByText(/runtime:/i)).toBeInTheDocument();
    expect(screen.getByText(/2h 28m/i)).toBeInTheDocument(); // 148 min → 2h 28m
  });

  test("renders movie genre", () => {
    render(<MovieInfo selectedMovie={mockMovie} />);
    expect(screen.getByText(/genre:/i)).toBeInTheDocument();
    expect(screen.getByText(/sci-fi \/ action/i)).toBeInTheDocument();
  });

  test("renders movie rating and votes", () => {
    render(<MovieInfo selectedMovie={mockMovie} />);

    expect(screen.getByText(/⭐ 8.8/i)).toBeInTheDocument();
    expect(screen.getByText(/1000000 votes/i)).toBeInTheDocument();
  });

  test("does not render runtime if missing", () => {
    const movieWithoutRuntime = { ...mockMovie, runtime: null };
    render(<MovieInfo selectedMovie={movieWithoutRuntime} />);

    expect(screen.queryByText(/runtime:/i)).not.toBeInTheDocument();
  });

  test("does not render genre if missing", () => {
    const movieWithoutGenre = { ...mockMovie, genre: "" };
    render(<MovieInfo selectedMovie={movieWithoutGenre} />);

    expect(screen.queryByText(/genre:/i)).not.toBeInTheDocument();
  });

  test("does not render rating and votes if missing", () => {
    const movieWithoutRating = {
      ...mockMovie,
      average_rating: null,
      num_votes: null,
    };
    render(<MovieInfo selectedMovie={movieWithoutRating} />);

    expect(screen.queryByText(/⭐/i)).not.toBeInTheDocument();
  });
});
