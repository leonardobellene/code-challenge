import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./index";
import { describe, test, expect, vi } from "vitest";

describe("SearchBar Component", () => {
  test("renders input field with placeholder", () => {
    render(<SearchBar searchTerm="" setSearchTerm={vi.fn()} />);

    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toBeInTheDocument();
  });

  test("renders with the correct initial value", () => {
    render(<SearchBar searchTerm="Inception" setSearchTerm={vi.fn()} />);

    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toHaveValue("Inception");
  });

  test("calls setSearchTerm on input change", () => {
    const mockSetSearchTerm = vi.fn();
    render(<SearchBar searchTerm="" setSearchTerm={mockSetSearchTerm} />);

    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(input, { target: { value: "Interstellar" } });

    expect(mockSetSearchTerm).toHaveBeenCalledTimes(1);
    expect(mockSetSearchTerm).toHaveBeenCalledWith("Interstellar");
  });

  test("renders with accessible label", () => {
    render(<SearchBar searchTerm="" setSearchTerm={vi.fn()} />);

    const input = screen.getByLabelText("Search movies");
    expect(input).toBeInTheDocument();
  });
});
