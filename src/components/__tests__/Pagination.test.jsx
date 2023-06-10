import { createPagination, Pagination } from "../Pagination";
import { expect, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

describe("createPagination()", () => {
  it("should return the entire list when the number of siblings is greater than the total number of pages", () => {
    expect(createPagination(1, 3, 8)).toStrictEqual([1, 2, 3]);
    expect(createPagination(2, 3, 8)).toStrictEqual([1, 2, 3]);
    expect(createPagination(3, 3, 8)).toStrictEqual([1, 2, 3]);
  });

  it("should not add dots when they are not needed", () => {
    expect(createPagination(3, 5, 2)).toStrictEqual([1, 2, 3, 4, 5]);
    expect(createPagination(3, 5, 1)).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it("returns the initial pages according to the siblings specified adding dots and the last page of the total", () => {
    expect(createPagination(1, 5, 2)).toStrictEqual([1, 2, 3, "...", 5]);
    expect(createPagination(1, 50, 1)).toStrictEqual([1, 2, "...", 50]);
    expect(createPagination(2, 50, 1)).toStrictEqual([1, 2, 3, "...", 50]);
    expect(createPagination(1, 50, 2)).toStrictEqual([1, 2, 3, "...", 50]);
    expect(createPagination(2, 50, 2)).toStrictEqual([1, 2, 3, 4, "...", 50]);
    expect(createPagination(3, 50, 2)).toStrictEqual([1, 2, 3, 4, 5, "...", 50]);
    expect(createPagination(1, 50, 3)).toStrictEqual([1, 2, 3, 4, "...", 50]);
    expect(createPagination(2, 50, 3)).toStrictEqual([1, 2, 3, 4, 5, "...", 50]);
    expect(createPagination(3, 50, 3)).toStrictEqual([1, 2, 3, 4, 5, 6, "...", 50]);
    expect(createPagination(4, 50, 3)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, "...", 50]);
  });

  it("returns the 'middle' pages with dots on each side, including the starting page and the last one as the first and last elements in the array", () => {
    expect(createPagination(4, 50, 1)).toStrictEqual([1, "...", 3, 4, 5, "...", 50]);
    expect(createPagination(5, 50, 1)).toStrictEqual([1, "...", 4, 5, 6, "...", 50]);
    expect(createPagination(5, 50, 2)).toStrictEqual([
      1,
      "...",
      3,
      4,
      5,
      6,
      7,
      "...",
      50,
    ]);
    expect(createPagination(6, 50, 2)).toStrictEqual([
      1,
      "...",
      4,
      5,
      6,
      7,
      8,
      "...",
      50,
    ]);
    expect(createPagination(6, 50, 3)).toStrictEqual([
      1,
      "...",
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "...",
      50,
    ]);
    expect(createPagination(7, 50, 3)).toStrictEqual([
      1,
      "...",
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      "...",
      50,
    ]);
  });

  it("returns the last pages according to the siblings specified, adding the starting page and dots as the first elements", () => {
    expect(createPagination(50, 50, 1)).toStrictEqual([1, "...", 49, 50]);
    expect(createPagination(49, 50, 1)).toStrictEqual([1, "...", 48, 49, 50]);
    expect(createPagination(50, 50, 2)).toStrictEqual([1, "...", 48, 49, 50]);
    expect(createPagination(49, 50, 2)).toStrictEqual([1, "...", 47, 48, 49, 50]);
    expect(createPagination(48, 50, 2)).toStrictEqual([1, "...", 46, 47, 48, 49, 50]);
    expect(createPagination(50, 50, 3)).toStrictEqual([1, "...", 47, 48, 49, 50]);
    expect(createPagination(49, 50, 3)).toStrictEqual([1, "...", 46, 47, 48, 49, 50]);
    expect(createPagination(48, 50, 3)).toStrictEqual([1, "...", 45, 46, 47, 48, 49, 50]);
    expect(createPagination(47, 50, 3)).toStrictEqual([
      1,
      "...",
      44,
      45,
      46,
      47,
      48,
      49,
      50,
    ]);
    expect(createPagination(5, 5, 2)).toStrictEqual([1, "...", 3, 4, 5]);
  });

  it("must include the starting page when the first sibling is next to it, ignoring the number of siblings", () => {
    expect(createPagination(4, 5, 2)).toStrictEqual([1, 2, 3, 4, 5]);
    expect(createPagination(3, 50, 1)).toStrictEqual([1, 2, 3, 4, "...", 50]);
    expect(createPagination(4, 50, 2)).toStrictEqual([1, 2, 3, 4, 5, 6, "...", 50]);
    expect(createPagination(5, 50, 3)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, "...", 50]);
  });

  it("must include the last page when the last sibling is next to it, ignoring the number of siblings", () => {
    expect(createPagination(2, 5, 2)).toStrictEqual([1, 2, 3, 4, 5]);
    expect(createPagination(48, 50, 1)).toStrictEqual([1, "...", 47, 48, 49, 50]);
    expect(createPagination(47, 50, 2)).toStrictEqual([1, "...", 45, 46, 47, 48, 49, 50]);
    expect(createPagination(46, 50, 3)).toStrictEqual([
      1,
      "...",
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
    ]);
  });

  it("should return the rest of the items when the current page is greater than the total number of pages", () => {
    expect(createPagination(6, 5, 4)).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it("displays the correct pages when dealing with a small number of pages", () => {
    expect(createPagination(1, 1, 2)).toStrictEqual([1]);
    expect(createPagination(1, 2, 3)).toStrictEqual([1, 2]);
    expect(createPagination(2, 2, 1)).toStrictEqual([1, 2]);
    expect(createPagination(1, 3, 8)).toStrictEqual([1, 2, 3]);
    expect(createPagination(2, 3, 12)).toStrictEqual([1, 2, 3]);
    expect(createPagination(3, 3, 200)).toStrictEqual([1, 2, 3]);
  });
});

describe("createPagination() errors", () => {
  it("should throw an error when called with non-numeric arguments", () => {
    expect(() => createPagination(null, [], 2)).toThrowError();
    expect(() => createPagination(5, 10, NaN)).toThrowError();
    expect(() => createPagination(NaN, 5, 2)).toThrowError();
    expect(() => createPagination(1, NaN, 2)).toThrowError();
    expect(() => createPagination(null, undefined)).toThrowError();
    expect(() => createPagination(5, 20, [])).toThrowError();
    expect(() => createPagination(5, {}, 2)).toThrowError();
    expect(() => createPagination(5, 10, -1)).toThrowError();
  });

  it("should throw an error when the current page is negative or equal to zero", () => {
    expect(() => createPagination(0, 5, 4)).toThrowError();
    expect(() => createPagination(-1, 5, 4)).toThrowError();
    expect(() => createPagination(0, 1)).toThrowError();
    expect(() => createPagination(-1, 1)).toThrowError();
    expect(() => createPagination(-1, 10)).toThrowError();
  });

  it("should throw an error when the total number of pages is negative or equal to zero", () => {
    expect(() => createPagination(5, 0)).toThrowError();
    expect(() => createPagination(1, -1)).toThrowError();
    expect(() => createPagination(1, 0)).toThrowError();
  });
});

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
