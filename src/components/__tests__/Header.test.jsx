import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../../context/CartContext";
import { Header } from "../Header";

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

describe("<Header>", () => {
  it("must render a logo image", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Header />
        </CartProvider>
      </BrowserRouter>
    );

    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  it("should render a list of links", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Header />
        </CartProvider>
      </BrowserRouter>
    );

    expect(screen.getAllByRole("link")).not.toHaveLength(0);
  });

  it("renders a 'home' link", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Header />
        </CartProvider>
      </BrowserRouter>
    );
    const homeLink = screen.getByRole("link", { name: /home/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href");
  });

  it("renders a 'shop' link", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Header />
        </CartProvider>
      </BrowserRouter>
    );
    const homeLink = screen.getByRole("link", { name: /shop/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href");
  });

  it("renders a 'cart' button", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Header />
        </CartProvider>
      </BrowserRouter>
    );
    const cartBtn = screen.getByRole("button", { name: /open cart/i });

    expect(cartBtn).toBeInTheDocument();
  });
});
