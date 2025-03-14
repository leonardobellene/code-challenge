import { render, screen, fireEvent } from "@testing-library/react";
import GenreSelector from "./index";
import { describe, test, expect, vi } from "vitest";
import { GENRES } from "../../constants";

describe("GenreSelector Component", () => {
  test("renders 'Select Genres' button", () => {
    render(<GenreSelector selectedGenres={[]} setSelectedGenres={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Select Genres" })
    ).toBeInTheDocument();
  });

  test("opens genre selection when button is clicked", () => {
    render(<GenreSelector selectedGenres={[]} setSelectedGenres={vi.fn()} />);

    const button = screen.getByRole("button", { name: "Select Genres" });
    fireEvent.click(button);

    GENRES.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", { name: "Hide Genres" })
    ).toBeInTheDocument();
  });

  test("selects a genre when clicked", () => {
    const setSelectedGenres = vi.fn();
    const selectedGenres: string[] = [];

    render(
      <GenreSelector
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Select Genres" }));

    const genreButton = screen.getByText(GENRES[0]);
    fireEvent.click(genreButton);

    expect(setSelectedGenres).toHaveBeenCalledTimes(1);
    const updateFunction = setSelectedGenres.mock.calls[0][0];

    // Execute the function with previous state
    const newState = updateFunction(selectedGenres);
    // Should add the genre to the array
    expect(newState).toEqual([GENRES[0]]);
  });

  test("deselects a selected genre when clicked again", () => {
    const setSelectedGenres = vi.fn();
    const selectedGenres = [GENRES[0]];

    render(
      <GenreSelector
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Select Genres" }));

    const genreButton = screen.getByText(GENRES[0]);
    fireEvent.click(genreButton);

    expect(setSelectedGenres).toHaveBeenCalledTimes(1);
    const updateFunction = setSelectedGenres.mock.calls[0][0];

    const newState = updateFunction(selectedGenres);
    expect(newState).toEqual([]);
  });

  test("clears all genres when 'Clear All' is clicked", () => {
    const setSelectedGenres = vi.fn();
    render(
      <GenreSelector
        selectedGenres={[GENRES[0], GENRES[1]]}
        setSelectedGenres={setSelectedGenres}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Select Genres" }));

    const clearAllButton = screen.getByText("Clear All");
    fireEvent.click(clearAllButton);

    expect(setSelectedGenres).toHaveBeenCalledWith([]);
  });

  test("hides genre selection when button is clicked again", () => {
    render(<GenreSelector selectedGenres={[]} setSelectedGenres={vi.fn()} />);

    const button = screen.getByRole("button", { name: "Select Genres" });
    fireEvent.click(button);

    expect(screen.getByText(GENRES[0])).toBeInTheDocument();

    fireEvent.click(button);

    GENRES.forEach((genre) => {
      expect(screen.queryByText(genre)).not.toBeInTheDocument();
    });
  });
});
