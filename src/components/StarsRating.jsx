import { useId } from "react";

export function StarsRating({
  itemRating,
  showRating = false,
  reviewCount,
  className = "",
}) {
  const referenceId = useId();

  if (!itemRating) return null;

  return (
    <div className={`flex flex-wrap items-center ${className}`}>
      <span
        aria-describedby={referenceId}
        className="users-rating"
        style={{
          "--rating": itemRating,
          "--percent": "calc(var(--rating) / 5 * 100%)",
        }}
      ></span>

      <p
        id={referenceId}
        hidden
      >{`User rating, ${itemRating} out of 5 stars with ${reviewCount} reviews.`}</p>

      {showRating && <span className="text-sm font-semibold mr-1">{itemRating}</span>}

      {reviewCount && <span className="text-sm text-slate-500">({reviewCount})</span>}
    </div>
  );
}
