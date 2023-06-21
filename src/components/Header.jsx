import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Logo from "../assets/images/logo.png";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { useCart } from "../context/CartContext";
import { SearchBar } from "./SearchBar";

export function Header({ hasImageBelow = false }) {
  const [isAtTop, setIsAtTop] = useState(true);
  const scrollWatcher = useRef(null);
  const scrollDir = useScrollDirection();
  const { toggleIsCartActive, items } = useCart();

  useEffect(() => {
    const watcher = scrollWatcher.current;
    const observer = new IntersectionObserver((entries) => {
      const headerEntry = entries[0];
      if (headerEntry.isIntersecting) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    });
    observer.observe(watcher);

    return () => {
      observer.disconnect();
    };
  });

  let headerStyles = "";
  if (!isAtTop) {
    headerStyles =
      "bg-white/30 text-black stroke-black backdrop-blur-xl h-16 border-white/30";
    if (scrollDir === "down") headerStyles += " -translate-y-full";
  } else {
    headerStyles = "border-transparent relative h-20";
    headerStyles += hasImageBelow
      ? " text-white bg-gradient-to-b bg-no-repeat from-black/50 stroke-white"
      : " stroke-black";
  }

  const itemsOnCart = items.reduce((total, item) => {
    return (total += item.quantity);
  }, 0);

  return (
    <>
      <div
        ref={scrollWatcher}
        className="h-20 w-full absolute"
        data-scroll-anchor=""
      ></div>

      <header
        className={`sticky top-0 z-50 w-full flex items-center justify-between py-3 px-8 transition-all duration-200 border-b ${headerStyles}`}
      >
        <div className="h-full w-4/12 grow">
          <NavLink to="/">
            <img src={Logo} alt="DarkWool's Organization logo" className="h-full" />
          </NavLink>
        </div>

        <div className="max-w-lg w-4/12 grow">
          <SearchBar
            icon={
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            }
          />
        </div>

        <div className="flex grow items-center justify-end w-4/12">
          <nav>
            <ul className="flex row gap-x-16 font-medium items-center text-sm">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/shop">Shop</NavLink>
              </li>
              <li className="flex items-center">
                {itemsOnCart !== 0 && (
                  <span className="block mr-2 font-bold">{itemsOnCart}</span>
                )}
                <button
                  className="cursor-pointer"
                  onClick={toggleIsCartActive}
                  aria-label="Open Cart"
                >
                  <svg
                    className="fill-none stroke-inherit w-8 h-8"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
