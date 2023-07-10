export function Overlay({ onClick, onPointerDown, isVisible, className }) {
  const bgStyles = isVisible ? "bg-black/70 backdrop-blur-sm" : "";
  const styles = className ? className : "";

  return (
    <div
      className={`z-[999] fixed top-0 w-full min-h-screen transition-all duration-300 ${bgStyles} ${styles}`}
      onClick={onClick}
      onPointerDown={onPointerDown}
    ></div>
  );
}
