import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function SearchBar({ icon, inputStyles, placeholder, onSubmit = null }) {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();

    const value = inputRef.current.value;
    if (value === "") return;
    if (onSubmit) onSubmit();

    navigate(`/shop?search=${inputRef.current.value}`);
    e.target.reset();
  };

  return (
    <form onSubmit={submitSearch} className="relative flex items-center">
      <button
        type="button"
        className="block absolute right-0 px-4"
        onClick={submitSearch}
      >
        {icon}
      </button>

      <input
        type="text"
        className={`w-full ${inputStyles}`}
        placeholder={placeholder}
        ref={inputRef}
      />
    </form>
  );
}
