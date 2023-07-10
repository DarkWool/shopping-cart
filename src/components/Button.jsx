export function Button({ children, variant, label, onClick, className }) {
  const btnStyles = variant ? `btn-${variant} ${className}` : className;

  return (
    <button type="button" className={btnStyles} aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}
