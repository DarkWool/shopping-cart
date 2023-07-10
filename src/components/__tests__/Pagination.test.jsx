import { Pagination } from "../Pagination";
import { expect, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

describe("Pagination component", () => {
  it("renders the correct pages", () => {
    render(
      <BrowserRouter>
        <Pagination currPage={1} totalPages={50} siblings={3} />
      </BrowserRouter>
    );

    expect(screen.getByText(/1/)).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
    expect(screen.getByText(/4/)).toBeInTheDocument();
    expect(screen.getByText(/.../)).toBeInTheDocument();
    expect(screen.getByText(/50/)).toBeInTheDocument();
  });

  it("renders a list of links", () => {
    render(
      <BrowserRouter>
        <Pagination currPage={1} totalPages={50} siblings={3} />
      </BrowserRouter>
    );
    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(4);
    expect(links[0].textContent).toMatch(/2/);
    expect(links[1].textContent).toMatch(/3/);
    expect(links[2].textContent).toMatch(/4/);
    expect(links[3].textContent).toMatch(/50/);
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });

  it("displays the current page as text, not as a link", () => {
    render(
      <BrowserRouter>
        <Pagination currPage={10} totalPages={50} siblings={2} />
      </BrowserRouter>
    );
    const links = screen.getAllByRole("link");

    expect(screen.getByText(/10/)).toBeInTheDocument();
    expect(links).toHaveLength(6);
    links.forEach((link) => expect(link.textContent).not.toMatch(/10/));
  });

  it("calls onPageChange correct number of times", async () => {
    const user = userEvent.setup();
    const onPageChangeMock = vi.fn();

    render(
      <BrowserRouter>
        <Pagination
          currPage={10}
          totalPages={50}
          siblings={2}
          onPageChange={onPageChangeMock}
        />
      </BrowserRouter>
    );
    const links = screen.getAllByRole("link");
    await user.click(links[0]);

    expect(onPageChangeMock).toHaveBeenCalled(1);
  });
});
