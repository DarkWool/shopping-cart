import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductQuantity } from "../ProductQuantity";
import userEvent from "@testing-library/user-event";

describe("ProductQuantity", () => {
  it("must render 2 buttons", () => {
    render(<ProductQuantity />);

    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("should correctly render the quantity", () => {
    render(<ProductQuantity quantity={5} />);

    expect(screen.getByText(5));
  });

  it("successfully calls onIncrement", async () => {
    const user = userEvent.setup();
    const onIncrementMock = vi.fn();

    render(<ProductQuantity quantity={1} onIncrement={onIncrementMock} />);
    const incrementBtn = screen.getByRole("button", { name: /increment/i });
    await user.click(incrementBtn);

    expect(onIncrementMock).toHaveBeenCalledTimes(1);
  });

  it("successfully calls onDecrement", async () => {
    const user = userEvent.setup();
    const onDecrementMock = vi.fn();

    render(<ProductQuantity quantity={1} onDecrement={onDecrementMock} />);
    const decrementBtn = screen.getByRole("button", { name: /decrement/i });
    await user.click(decrementBtn);

    expect(onDecrementMock).toHaveBeenCalledTimes(1);
  });
});
