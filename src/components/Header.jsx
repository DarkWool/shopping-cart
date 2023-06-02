import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.png";

export function Header({ onOpenCart, isAboveBanner = false }) {
  const darkStyles = isAboveBanner
    ? "text-white bg-gradient-to-b from-black/50 stroke-white"
    : "stroke-black";

  return (
    <header
      className={`relative z-50 w-full flex items-center justify-between py-3 h-20 px-8 ${darkStyles}`}
    >
      <div>
        <NavLink to="/">
          <img src={Logo} alt="DarkWool's Organization logo" />
        </NavLink>
      </div>

      <nav>
        <ul className="flex row gap-x-16 font-medium items-center text-sm">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <button
              className="cursor-pointer"
              onClick={onOpenCart}
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
    </header>
  );
}
