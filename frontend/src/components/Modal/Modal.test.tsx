import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./index";
import { describe, test, expect, vi } from "vitest";

describe("Modal Component", () => {
  test("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  test("renders correctly when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  test("calls onClose when clicking the close button", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Modal Content</p>
      </Modal>
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when pressing the Escape key", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("disables scrolling when opened and restores it when closed", () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal isOpen={false} onClose={vi.fn()}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("auto");
  });
});
