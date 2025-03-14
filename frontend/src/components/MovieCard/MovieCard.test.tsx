import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "./index";
import { describe, test, expect, vi } from "vitest";
import { Movie } from "../../types";

const mockMovie: Movie = {
  tconst: "tt1234567",
  title: "Inception",
  year: "2010",
  genre: "Sci-Fi, Action",
  average_rating: "8.8",
  original_title: "Inception",
  runtime: "148",
  num_votes: "1000000",
};

describe("MovieCard Component", () => {
  test("renders movie title and year correctly", () => {
    render(<MovieCard movie={mockMovie} onSelectMovie={vi.fn()} />);
    
    expect(screen.getByText("Inception (2010)")).toBeInTheDocument();
  });

  test("displays movie genres properly", () => {
    render(<MovieCard movie={mockMovie} onSelectMovie={vi.fn()} />);
    
    expect(screen.getByText("Sci-Fi / Action")).toBeInTheDocument();
  });

  test("shows average rating if available", () => {
    render(<MovieCard movie={mockMovie} onSelectMovie={vi.fn()} />);
    
    expect(screen.getByText("⭐ 8.8")).toBeInTheDocument();
  });

  test("calls onSelectMovie when clicked", () => {
    const onSelectMovie = vi.fn();
    render(<MovieCard movie={mockMovie} onSelectMovie={onSelectMovie} />);
    
    const movieCard = screen.getByRole("listitem");
    fireEvent.click(movieCard);

    expect(onSelectMovie).toHaveBeenCalledTimes(1);
    expect(onSelectMovie).toHaveBeenCalledWith(mockMovie);
  });

  test("calls onSelectMovie when Enter key is pressed", () => {
    const onSelectMovie = vi.fn();
    render(<MovieCard movie={mockMovie} onSelectMovie={onSelectMovie} />);
    
    const movieCard = screen.getByRole("listitem");
    fireEvent.keyDown(movieCard, { key: "Enter" });

    expect(onSelectMovie).toHaveBeenCalledTimes(1);
    expect(onSelectMovie).toHaveBeenCalledWith(mockMovie);
  });

  test("calls onSelectMovie when Space key is pressed", () => {
    const onSelectMovie = vi.fn();
    render(<MovieCard movie={mockMovie} onSelectMovie={onSelectMovie} />);
    
    const movieCard = screen.getByRole("listitem");
    fireEvent.keyDown(movieCard, { key: " " });

    expect(onSelectMovie).toHaveBeenCalledTimes(1);
    expect(onSelectMovie).toHaveBeenCalledWith(mockMovie);
  });
});
