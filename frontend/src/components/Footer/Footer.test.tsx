import { render, screen } from "@testing-library/react";
import Footer from "./index";
import { describe, test, expect } from "vitest";

describe("Footer Component", () => {
  test("renders the footer", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  test("contains correct text", () => {
    render(<Footer />);

    expect(
      screen.getByText("© 2025 Movie Explorer. All rights reserved.")
    ).toBeInTheDocument();
  });

  test("has correct accessibility attributes", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveAttribute("aria-label", "Movie Explorer Footer");
  });
});
