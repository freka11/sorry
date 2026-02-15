import { useEffect } from "react";
import confetti from "canvas-confetti";

const HEART_EMOJIS = ["💗", "💕", "💖", "💘", "💝", "❤️", "🌸", "✨"];

const CelebrationMode = () => {
  useEffect(() => {
    const duration = 5000;
    const end = Date.now() + duration;
    const colors = ["#ff69b4", "#ff1493", "#ffb6c1", "#ffc0cb", "#ff85a2"];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.6 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen bg-celebration flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Hidden YouTube iframe */}
      <iframe
        src="https://www.youtube.com/embed/8ELbX5CMomE?autoplay=1&loop=1&playlist=8ELbX5CMomE&controls=0"
        allow="autoplay"
        className="hidden"
        title="background music"
      />

      {/* Floating celebration hearts */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="fixed text-3xl confetti-heart pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }}
        >
          {HEART_EMOJIS[i % HEART_EMOJIS.length]}
        </span>
      ))}

      <div className="text-center z-10 bounce-in">
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGl2OGFtdTF5ZnF1YXJpZmVlb2VyNXl5OWo3dWp0ejd0eGYyYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif"
          alt="celebration"
          className="w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-2xl shadow-2xl mb-8 object-cover"
        />
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-foreground mb-4 drop-shadow-lg">
          Best decision of your life 💕
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
          I knew you'd choose correctly. 😌
        </p>
      </div>

      <p className="fixed bottom-4 right-4 text-xs text-muted-foreground opacity-60 fade-in">
        This website was built under emotional pressure.
      </p>
    </div>
  );
};

export default CelebrationMode;
