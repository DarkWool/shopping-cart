import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Header } from "../Header";

describe("<Header>", () => {
  it("must render a logo image", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  it("should render a list of links", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getAllByRole("link")).not.toHaveLength(0);
  });

  it("renders a 'home' link", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const homeLink = screen.getByRole("link", { name: /home/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href");
  });

  it("renders a 'shop' link", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const homeLink = screen.getByRole("link", { name: /shop/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href");
  });

  it("calls onOpenCart correct number of times", async () => {
    const user = userEvent.setup();
    const onOpenCartMock = vi.fn();

    render(
      <BrowserRouter>
        <Header onOpenCart={onOpenCartMock} />
      </BrowserRouter>
    );
    const cartBtn = screen.getByRole("button", { name: /open cart/i });
    await user.click(cartBtn);

    expect(onOpenCartMock).toHaveBeenCalledTimes(1);
  });
});
