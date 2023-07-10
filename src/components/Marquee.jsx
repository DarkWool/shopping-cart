export function Marquee({ className, content }) {
  return (
    <div className={`overflow-hidden py-1 flex ${className}`}>
      <span className="relative shrink-0 flex justify-around min-w-full animate-marquee">
        {content}
      </span>
      <span className="relative shrink-0 flex justify-around min-w-full animate-marquee">
        {content}
      </span>
    </div>
  );
}
