import { render, screen } from "@testing-library/react";
import Header from "./index";
import { describe, test, expect } from "vitest";

describe("Header Component", () => {
  test("renders the header", () => {
    render(<Header />);
    
    // Check if the header is in the document
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  test("contains correct heading text", () => {
    render(<Header />);
    
    expect(screen.getByRole("heading", { level: 1, name: "🎬 Movie Explorer" })).toBeInTheDocument();
  });

  test("has correct accessibility attributes", () => {
    render(<Header />);
    
    const header = screen.getByRole("banner");
    
    // Ensure aria-label is set correctly
    expect(header).toHaveAttribute("aria-label", "Movie Explorer Header");
  });
});
