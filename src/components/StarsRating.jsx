export function StarsRating({ itemRating, showRating = false, reviewCount }) {
  return (
    <div className="flex items-center">
      <span
        className="text-2xl tracking-tighter bg-stars-gradient before:content-['★★★★★'] bg-clip-text text-transparent mr-1"
        style={{
          "--rating": itemRating,
          "--percent": "calc(var(--rating) / 5 * 100%)",
        }}
      ></span>

      {showRating && <span className="text-sm font-semibold mr-1">{itemRating}</span>}

      {reviewCount && <span className="text-sm text-slate-500">({reviewCount})</span>}
    </div>
  );
}
