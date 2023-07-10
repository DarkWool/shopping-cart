import Logo from "../assets/images/logo.svg";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { useCart } from "../context/CartContext";
import { SearchBar } from "./SearchBar";
import { Overlay } from "./Overlay";

export function Header({ variant = "light" }) {
  const [isAtTop, setIsAtTop] = useState(true);
  const scrollWatcher = useRef(null);
  const scrollDir = useScrollDirection();
  const { toggleIsCartActive, items } = useCart();
  const [isMobileVisible, setIsMobileVisible] = useState(false);

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

  const itemsOnCart = items.reduce((total, item) => {
    return (total += item.quantity);
  }, 0);

  const styles = {
    header: "",
    searchInput: "w-full bg-white/40 border border-zinc-400 py-2 px-3 rounded pr-12",
  };

  if (isAtTop) {
    styles.header = "border-transparent relative h-20";
    if (variant === "dark") {
      styles.header +=
        " text-white bg-gradient-to-b bg-no-repeat from-black/50 stroke-white";
      styles.searchInput += " placeholder:text-zinc-300";
    } else {
      styles.header += " stroke-black";
      styles.searchInput += " placeholder:text-zinc-400";
    }
  } else {
    styles.searchInput += " placeholder:text-zinc-400";
    styles.header =
      "bg-white/30 text-black stroke-black backdrop-blur-xl h-16 border-white/30";
    if (scrollDir === "down") styles.header += " -translate-y-full";
  }

  return (
    <>
      <div
        ref={scrollWatcher}
        className="h-20 w-full absolute"
        data-scroll-anchor=""
      ></div>

      <header
        className={`sticky top-0 z-50 w-full flex items-center justify-between py-3 px-3 lg:px-8 transition-all duration-200 border-b ${styles.header}`}
      >
        <div className="h-full w-4/12 grow">
          <NavLink to="/">
            <img
              src={Logo}
              alt="DarkWool's Organization logo"
              className="h-full w-28 md:w-52 transition-colors duration-200"
            />
          </NavLink>
        </div>

        <div className="max-w-lg w-4/12 grow hidden lg:block">
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
            placeholder="Search for your favorite product..."
            inputStyles={styles.searchInput}
          />
        </div>

        <div className="flex grow items-center justify-end w-4/12">
          <nav>
            <ul className="flex row gap-x-5 lg:gap-x-16 font-medium items-center text-sm">
              <li className="hidden lg:block">
                <NavLink to="/">Home</NavLink>
              </li>

              <li className="hidden lg:block">
                <NavLink to="/shop">Shop</NavLink>
              </li>

              <li className="flex items-center">
                {itemsOnCart !== 0 && (
                  <span className="block mr-2 font-bold">{itemsOnCart}</span>
                )}
                <button
                  className="cursor-pointer block"
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

              <li className="lg:hidden">
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() =>
                    isMobileVisible ? setIsMobileVisible(false) : setIsMobileVisible(true)
                  }
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {isMobileVisible && (
        <>
          <MobileMenu onClose={() => setIsMobileVisible(false)} />
        </>
      )}
    </>
  );
}

function MobileMenu({ onClose }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionStyles = isTransitioning
    ? "translate-x-0"
    : "-translate-x-full invisible";
  const TRANSITION_DURATION = 200;

  useEffect(() => {
    setTimeout(() => setIsTransitioning(true), 0);
  }, []);

  const handleCloseTransition = () => {
    setIsTransitioning(false);
    setTimeout(() => {
      onClose();
    }, TRANSITION_DURATION);
  };

  return (
    <>
      <div
        className={`fixed h-full bg-white z-[1100] w-64 p-6 font-medium duration-200 lg:-translate-x-full ${transitionStyles}`}
      >
        <div className="mb-5">
          <SearchBar
            icon={
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            }
            placeholder="Search for products"
            inputStyles="pl-2 pr-9 py-2 border"
            onSubmit={handleCloseTransition}
          />
        </div>

        <hr className="bg-gray-300 my-6 border-transparent" />

        <ul className="flex flex-col gap-y-5">
          <li className="block">
            <NavLink to="/" onClick={handleCloseTransition}>
              Home
            </NavLink>
          </li>

          <li className="block">
            <NavLink to="/shop" onClick={handleCloseTransition}>
              Shop
            </NavLink>
          </li>
        </ul>
      </div>
      <Overlay
        onPointerDown={handleCloseTransition}
        isVisible={isTransitioning}
        className="lg:opacity-0 lg:hidden"
      />
    </>
  );
}
