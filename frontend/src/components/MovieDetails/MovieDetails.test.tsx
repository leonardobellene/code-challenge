import { render, screen, fireEvent } from "@testing-library/react";
import MovieDetails from "./index";
import { describe, test, expect, vi } from "vitest";
import { Movie, Principal, Name } from "../../types";

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

const mockPrincipals: Principal[] = [
  {
    id: 1,
    nconst: "nm0000138",
    category: "actor",
    characters: '["Dom Cobb"]',
    tconst: "tt1234567",
    job: null,
  },
];

const mockNames: Name[] = [
  {
    nconst: "nm0000138",
    name: "Leonardo DiCaprio",
    birth_year: "1974",
    death_year: null,
    primary_professions: "actor,producer,writer",
    known_for_titles: "tt0056193,tt0047522,tt0053125,tt0039677",
  },
];

describe("MovieDetails Component", () => {
  test("does not render when selectedMovie is null", () => {
    render(
      <MovieDetails
        principals={[]}
        names={[]}
        selectedMovie={null}
        onClose={vi.fn()}
      />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("renders modal when selectedMovie is provided", () => {
    render(
      <MovieDetails
        principals={mockPrincipals}
        names={mockNames}
        selectedMovie={mockMovie}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Inception (2010)")).toBeInTheDocument();
  });

  test("renders MovieInfo component", () => {
    render(
      <MovieDetails
        principals={mockPrincipals}
        names={mockNames}
        selectedMovie={mockMovie}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText(/genre:/i)).toBeInTheDocument();
    expect(screen.getByText(/sci-fi \/ action/i)).toBeInTheDocument();

    const ratingElements = screen.getAllByText(
      (_, element) => element?.textContent?.includes("⭐ 8.8") ?? false
    );

    expect(ratingElements.length).toBeGreaterThan(0);
  });

  test("renders PrincipalsList component", () => {
    render(
      <MovieDetails
        principals={mockPrincipals}
        names={mockNames}
        selectedMovie={mockMovie}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText("Leonardo DiCaprio")).toBeInTheDocument();
    expect(screen.getByText("🎭 as Dom Cobb")).toBeInTheDocument();
  });

  test("calls onClose when modal close button is clicked", () => {
    const onClose = vi.fn();
    render(
      <MovieDetails
        principals={mockPrincipals}
        names={mockNames}
        selectedMovie={mockMovie}
        onClose={onClose}
      />
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
