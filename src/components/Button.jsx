const variants = {
  primary:
    "py-4 px-10 font-bold rounded-full border-2 border-black shadow-[7px_8px_0px_5px_black] text-base duration-200 hover:bg-shiny-yellow",
};

export function Button({ children, variant, label, onClick, className }) {
  const btnStyles = variant ? `${variants[variant]} ${className}` : className;

  return (
    <button type="button" className={btnStyles} aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}
