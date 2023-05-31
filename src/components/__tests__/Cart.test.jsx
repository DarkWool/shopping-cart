import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Cart } from "../Cart";
import { CartProvider } from "../../context/CartContext";

describe("Cart", () => {
  it("renders the cart title", () => {
    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );

    expect(screen.getByText(/shopping bag/i));
  });

  it("closes the cart when the user clicks the close button", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );
    const cart = screen.getByTestId("cart");
    const closeBtn = screen.getByRole("button", { name: /close/i });
    await user.click(closeBtn);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(cart).toHaveClass("invisible");
  });

  it("renders 'subtotal' text", () => {
    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );

    expect(screen.getByText(/subtotal/i));
  });

  it("renders zero as the subtotal when there are no items in the cart", () => {
    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );

    expect(screen.getByTestId("subtotal").textContent).toMatch(/0/);
  });

  it("correctly calculates and renders the subtotal", () => {
    const mockData = [
      { id: 1, title: "Product 1", quantity: 1, price: 345 },
      { id: 2, title: "Product 2", quantity: 1, price: 200 },
      { id: 3, title: "Product 3", quantity: 1, price: 12.99 },
    ];

    render(
      <CartProvider initialItems={mockData}>
        <Cart />
      </CartProvider>
    );

    expect(screen.getByTestId("subtotal").textContent).toMatch(/557.99/);
  });

  it("renders 'checkout' button", () => {
    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );

    expect(screen.getByRole("link", { name: /checkout/i }));
  });
});

describe("Cart Items", () => {
  it("renders the correct number of items in ascending order", () => {
    const mockData = [
      { id: 1, title: "Product 1", quantity: 1, price: 345 },
      { id: 2, title: "Product 2", quantity: 1, price: 200 },
      { id: 3, title: "Product 3", quantity: 1, price: 12.99 },
    ];

    render(
      <CartProvider initialItems={mockData}>
        <Cart />
      </CartProvider>
    );

    const items = screen.getAllByTestId("itemTitle");
    expect(items[0].textContent).toMatch("Product 1");
    expect(items[1].textContent).toMatch("Product 2");
    expect(items[2].textContent).toMatch("Product 3");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders the items prices", () => {
    const mockData = [
      { id: 1, title: "Product 1", quantity: 1, price: 345 },
      { id: 2, title: "Product 2", quantity: 1, price: 200 },
      { id: 3, title: "Product 3", quantity: 1, price: 12.99 },
    ];

    render(
      <CartProvider initialItems={mockData}>
        <Cart />
      </CartProvider>
    );

    expect(screen.getByText(/345/));
    expect(screen.getByText(/200/));
    expect(screen.getByText(/12.99/));
  });

  it("removes an item from the cart when pressing the 'remove' button", async () => {
    const mockData = [
      { id: 1, title: "Product 1", quantity: 1, price: 345 },
      { id: 2, title: "Product 2", quantity: 1, price: 200 },
      { id: 3, title: "Product 3", quantity: 1, price: 12.99 },
    ];
    const user = userEvent.setup();

    render(
      <CartProvider initialItems={mockData}>
        <Cart />
      </CartProvider>
    );
    const removeItemBtns = screen.getAllByRole("button", { name: /remove item/i });
    await user.click(removeItemBtns[0]);

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
  });

  it("must render 2 buttons per item to decrement and increment its quantity", () => {
    const mockData = [
      { id: 1, title: "Product 1", quantity: 1, price: 345 },
      { id: 2, title: "Product 2", quantity: 1, price: 200 },
      { id: 3, title: "Product 3", quantity: 1, price: 12.99 },
    ];

    render(
      <CartProvider initialItems={mockData}>
        <Cart />
      </CartProvider>
    );

    expect(screen.getAllByRole("button", { name: /decrement/i })).toHaveLength(3);
    expect(screen.getAllByRole("button", { name: /increment/i })).toHaveLength(3);
  });

  it("decrements the item quantity when the 'decrement' button is clicked", async () => {
    const mockData = [{ id: 1, title: "Product 1", quantity: 5, price: 345 }];
    const user = userEvent.setup();

    render(
      <CartProvider initialItems={mockData}>
        <Cart />
      </CartProvider>
    );
    const decrementBtn = screen.getByRole("button", { name: /decrement/i });
    await user.click(decrementBtn);

    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("removes an item from the cart when its quantity is equal to 1 and the user clicks on the 'decrement' button", async () => {
    const mockData = [{ id: 1, title: "Product 1", quantity: 1, price: 345 }];
    const user = userEvent.setup();

    render(
      <CartProvider initialItems={mockData}>
        <Cart />
      </CartProvider>
    );
    const item = screen.getByRole("listitem");
    const decrementBtn = screen.getByRole("button", { name: /decrement/i });
    await user.click(decrementBtn);

    expect(item).not.toBeInTheDocument();
  });

  it("increments the item quantity when the 'increment' button is clicked", async () => {
    const mockData = [{ id: 1, title: "Product 1", quantity: 5, price: 345 }];
    const user = userEvent.setup();

    render(
      <CartProvider initialItems={mockData}>
        <Cart />
      </CartProvider>
    );
    const incrementBtn = screen.getByRole("button", { name: /increment/i });
    await user.click(incrementBtn);

    expect(screen.getByText("6")).toBeInTheDocument();
  });
});
