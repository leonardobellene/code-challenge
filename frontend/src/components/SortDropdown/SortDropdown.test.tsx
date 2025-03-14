import { render, screen, fireEvent, within } from "@testing-library/react";
import SortDropdown from "./index";
import { describe, test, expect, vi } from "vitest";
import { SORT_OPTIONS } from "../../constants";

describe("SortDropdown Component", () => {
  test("renders sort button with default text", () => {
    render(<SortDropdown sort="newest" setSort={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Sort movies" })
    ).toBeInTheDocument();
    expect(screen.getByText("Newest")).toBeInTheDocument();
  });

  test("opens dropdown when button is clicked", () => {
    render(<SortDropdown sort="newest" setSort={vi.fn()} />);

    const button = screen.getByRole("button", { name: "Sort movies" });
    fireEvent.click(button);
    const dropdown = screen.getByRole("listbox");
    SORT_OPTIONS.forEach((option) => {
      expect(
        within(dropdown).getByRole("option", { name: option.label })
      ).toBeInTheDocument();
    });
  });

  test("closes dropdown when clicking outside", () => {
    render(<SortDropdown sort="newest" setSort={vi.fn()} />);

    const button = screen.getByRole("button", { name: "Sort movies" });
    fireEvent.click(button);

    const dropdown = screen.getByRole("listbox");

    SORT_OPTIONS.forEach((option) => {
      expect(within(dropdown).getByText(option.label)).toBeInTheDocument();
    });

    fireEvent.mouseDown(document.body);

    SORT_OPTIONS.forEach((option) => {
      expect(
        within(dropdown).queryByText(option.label)
      ).not.toBeInTheDocument();
    });

    expect(button).toBeInTheDocument();
  });

  test("updates sort selection when an option is clicked", () => {
    const setSortMock = vi.fn();
    render(<SortDropdown sort="newest" setSort={setSortMock} />);

    const button = screen.getByRole("button", { name: "Sort movies" });
    fireEvent.click(button);

    const highestRatingOption = screen.getByText("Highest Rating");
    fireEvent.click(highestRatingOption);

    expect(setSortMock).toHaveBeenCalledWith("highest-rating");
    expect(screen.queryByText("Highest Rating")).not.toBeInTheDocument(); // Dropdown should close
  });

  test("updates sort when pressing Enter or Space on an option", () => {
    const setSortMock = vi.fn();
    render(<SortDropdown sort="newest" setSort={setSortMock} />);

    const button = screen.getByRole("button", { name: "Sort movies" });
    fireEvent.click(button);

    const oldestOption = screen.getByText("Oldest");
    fireEvent.keyDown(oldestOption, { key: "Enter" });

    expect(setSortMock).toHaveBeenCalledWith("oldest");

    fireEvent.click(button);
    fireEvent.keyDown(oldestOption, { key: " " });
    expect(setSortMock).toHaveBeenCalledWith("oldest");
  });
});
