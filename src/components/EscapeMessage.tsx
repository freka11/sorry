const EscapeMessage = ({ text, x, y }: { text: string; x: number; y: number }) => (
  <span
    className="fixed text-sm sm:text-base font-semibold text-accent float-up pointer-events-none z-50 drop-shadow-md"
    style={{ left: `${x}%`, top: `${y - 5}%` }}
  >
    {text}
  </span>
);

export default EscapeMessage;
