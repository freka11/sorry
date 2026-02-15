const FloatingHearts = ({ count = 5 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="fixed text-2xl opacity-20 pointer-events-none animate-bounce"
          style={{
            left: `${10 + (i * 80) / count}%`,
            top: `${20 + Math.sin(i) * 30}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          {["💗", "💕", "🌸", "💖", "✨"][i % 5]}
        </span>
      ))}
    </>
  );
};

export default FloatingHearts;
