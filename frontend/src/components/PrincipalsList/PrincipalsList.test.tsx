import { render, screen } from "@testing-library/react";
import PrincipalsList from "./index";
import { Principal, Name } from "../../types";
import { describe, test, expect } from "vitest";

const mockNames: Name[] = [
  {
    nconst: "nm0000138",
    name: "Leonardo DiCaprio",
    birth_year: "1974",
    death_year: null,
    primary_professions: "actor,writer,producer",
    known_for_titles: "tt0110912,tt3460252,tt4154664,tt2802144",
  },
  {
    nconst: "nm0000093",
    name: "Joseph Gordon-Levitt",
    birth_year: "1981",
    death_year: null,
    primary_professions: "actor,writer,producer",
    known_for_titles: "tt0110912,tt3460252,tt4154664,tt2802144",
  },
];

const mockPrincipals: Principal[] = [
  {
    id: 1,
    tconst: "tt1375666",
    nconst: "nm0000138",
    category: "actor",
    characters: `["Dom Cobb"]`,
    job: "screenplay",
  },
  {
    id: 2,
    tconst: "tt1375666",
    nconst: "nm0000093",
    category: "actor",
    characters: `["Arthur"]`,
    job: "screenplay",
  },
];

describe("PrincipalsList Component", () => {
  test("renders the PrincipalsList title", () => {
    render(<PrincipalsList principals={mockPrincipals} names={mockNames} />);

    expect(screen.getByText("Principals")).toBeInTheDocument();
  });

  test("renders each principal correctly", () => {
    render(<PrincipalsList principals={mockPrincipals} names={mockNames} />);

    expect(screen.getByText("Leonardo DiCaprio")).toBeInTheDocument();
    expect(screen.getByText("Joseph Gordon-Levitt")).toBeInTheDocument();

    expect(screen.getByText("🎭 as Dom Cobb")).toBeInTheDocument();
    expect(screen.getByText("🎭 as Arthur")).toBeInTheDocument();
  });

  test("renders 'Unknown Actor' if an actor is not found", () => {
    const unknownPrincipal: Principal = {
      id: 3,
      tconst: "tt1375666",
      nconst: "nm9999999",
      category: "actor",
      characters: `["Unknown Character"]`,
      job: "screenplay",
    };

    render(
      <PrincipalsList principals={[unknownPrincipal]} names={mockNames} />
    );

    expect(screen.getByText("Unknown Actor")).toBeInTheDocument();
    expect(screen.getByText("🎭 as Unknown Character")).toBeInTheDocument();
  });

  test("renders 'Unknown Character' if characters list is empty", () => {
    const principalWithoutCharacters: Principal = {
      id: 4,
      tconst: "tt1375666",
      nconst: "nm0000138",
      category: "actor",
      characters: "[]",
      job: "screenplay",
    };

    render(
      <PrincipalsList
        principals={[principalWithoutCharacters]}
        names={mockNames}
      />
    );

    expect(screen.getByText("🎭 as Unknown Character")).toBeInTheDocument();
  });

  test("renders nothing if no principals are provided", () => {
    render(<PrincipalsList principals={[]} names={mockNames} />);

    expect(screen.queryByText("Principals")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
