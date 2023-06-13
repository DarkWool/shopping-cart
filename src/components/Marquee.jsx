export function Marquee({ className, content }) {
  return (
    <div className={`overflow-hidden py-1 ${className}`}>
      <span className="animate-scroll-x-rtl relative inline-block">{content}</span>
    </div>
  );
}
