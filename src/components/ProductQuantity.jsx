export function ProductQuantity({ quantity, onDecrement, onIncrement }) {
  const btnStyles = `bg-slate-200 w-5 h-5 md:w-6 md:h-6 rounded-sm stroke-slate-600 flex justify-center items-center p-1 duration-150 transition-colors hover:bg-slate-300`;

  return (
    <div className="flex gap-x-2 text-base font-semibold items-center">
      <button
        type="button"
        className={btnStyles}
        onClick={onDecrement}
        aria-label="decrement"
        title="decrement"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          className="w-3 h-3 md:w-5 md:h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      </button>

      <span className="min-w-[30px] text-center text-sm md:text-base">{quantity}</span>

      <button
        type="button"
        className={btnStyles}
        onClick={onIncrement}
        aria-label="increment"
        title="increment"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          className="w-3 h-3 md:w-5 md:h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
  );
}
