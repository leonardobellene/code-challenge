import { render, screen } from "@testing-library/react";
import PrincipalCard from "./index";
import { Principal, Name } from "../../types";
import { describe, test, expect } from "vitest";

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

const mockPrincipal: Principal = {
  id: 1,
  tconst: "tt1375666",
  nconst: "nm0000138",
  job: "director",
  category: "actor",
  characters: `["Dom Cobb"]`,
};

describe("PrincipalCard Component", () => {
  test("renders actor name", () => {
    render(<PrincipalCard principal={mockPrincipal} names={mockNames} />);

    expect(screen.getByText("Leonardo DiCaprio")).toBeInTheDocument();
  });

  test("renders principal category", () => {
    render(<PrincipalCard principal={mockPrincipal} names={mockNames} />);

    expect(screen.getByText("actor")).toBeInTheDocument();
  });

  test("renders character names correctly", () => {
    render(<PrincipalCard principal={mockPrincipal} names={mockNames} />);

    expect(screen.getByText("🎭 as Dom Cobb")).toBeInTheDocument();
  });

  test("renders 'Unknown Actor' if actor not found", () => {
    const principalWithoutName: Principal = {
      ...mockPrincipal,
      nconst: "nm9999999",
    };
    render(
      <PrincipalCard principal={principalWithoutName} names={mockNames} />
    );

    expect(screen.getByText("Unknown Actor")).toBeInTheDocument();
  });

  test("renders 'Unknown Character' if character list is empty", () => {
    const principalWithoutCharacters: Principal = {
      ...mockPrincipal,
      characters: "[]",
    };
    render(
      <PrincipalCard principal={principalWithoutCharacters} names={mockNames} />
    );

    expect(screen.getByText("🎭 as Unknown Character")).toBeInTheDocument();
  });

  test("renders 'Unknown Character' if characters is null", () => {
    const principalWithNullCharacters: Principal = {
      ...mockPrincipal,
      characters: null,
    };
    render(
      <PrincipalCard
        principal={principalWithNullCharacters}
        names={mockNames}
      />
    );

    expect(screen.getByText("🎭 as Unknown Character")).toBeInTheDocument();
  });
});
