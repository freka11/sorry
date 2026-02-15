import { useState, useCallback, useEffect, useRef } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import CelebrationMode from "@/components/CelebrationMode";
import EscapeMessage from "@/components/EscapeMessage";

const ESCAPE_MESSAGES = [
  "illegal move 🚫",
  "nice try 😏",
  "that button is under maintenance 🔧",
  "404: option not available 💀",
  "bold of you 😤",
  "think again 🧠",
  "nah fam 🙅",
  "error: permission denied 🔒",
  "lol no 😂",
  "you really thought? 💅",
  "wrong answer bestie ❌",
  "try touching grass first 🌱",
  "this button has trust issues 💔",
  "buffering... forever ⏳",
  "access denied by the heart council 💕",
];

const Index = () => {
  const [escapeCount, setEscapeCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noPos, setNoPos] = useState<{ top: string; left: string } | null>(null);
  const [messages, setMessages] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [celebrated, setCelebrated] = useState(false);
  const [showCornerText, setShowCornerText] = useState(false);
  const [noDisappeared, setNoDisappeared] = useState(false);
  const [showUniverse, setShowUniverse] = useState(false);
  const msgId = useRef(0);
  const heartId = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowCornerText(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const getNoSize = () => {
    if (escapeCount >= 12) return 0.3;
    if (escapeCount >= 8) return 0.6;
    if (escapeCount >= 5) return 0.8;
    return 1;
  };

  const escapeNo = useCallback(() => {
    const newCount = escapeCount + 1;
    setEscapeCount(newCount);

    if (newCount >= 15) {
      setNoDisappeared(true);
      setShowUniverse(true);
      return;
    }

    const top = Math.random() * 70 + 10;
    const left = Math.random() * 70 + 10;
    setNoPos({ top: `${top}%`, left: `${left}%` });

    const msg = ESCAPE_MESSAGES[Math.floor(Math.random() * ESCAPE_MESSAGES.length)];
    const id = ++msgId.current;
    setMessages((prev) => [...prev, { id, text: msg, x: left, y: top }]);
    setTimeout(() => setMessages((prev) => prev.filter((m) => m.id !== id)), 2000);

    setYesScale((prev) => Math.min(prev + 0.06, 1.8));

    const hid = ++heartId.current;
    setHearts((prev) => [...prev, { id: hid, x: 50 + (Math.random() - 0.5) * 30 }]);
    setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== hid)), 2000);
  }, [escapeCount]);

  if (celebrated) {
    return <CelebrationMode />;
  }

  return (
    <div className={`min-h-screen bg-romantic flex flex-col items-center justify-center relative overflow-hidden px-4`}>
      {/* Hidden YouTube iframe for background music */}
      <iframe
        src="https://www.youtube.com/embed/8ELbX5CMomE?autoplay=1&loop=1&playlist=8ELbX5CMomE&controls=0"
        allow="autoplay"
        className="hidden"
        title="background music"
      />

      {/* Main content */}
      <div className="text-center z-10 fade-in">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-foreground mb-2 drop-shadow-lg" style={{ animation: 'wiggle 2s ease-in-out infinite' }}>
          Will you forgive me? 🥺💗
        </h1>
        <p className="text-muted-foreground text-lg mb-10 fade-in-delayed">
          (choose wisely... or don't, I already know the answer)
        </p>
      </div>

      {showUniverse && (
        <p className="text-2xl sm:text-3xl font-bold text-accent z-10 mb-6 bounce-in">
          ✨ The universe has spoken. ✨
        </p>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center z-10 fade-in-delayed">
        <button
          onClick={() => setCelebrated(true)}
          className={`px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-xl sm:text-2xl shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 ${escapeCount > 0 ? "glow-pulse" : ""}`}
          style={{ transform: `scale(${yesScale})` }}
        >
          YES 💚 obviously
        </button>

        {!noDisappeared && (
          <button
            onMouseEnter={escapeNo}
            onClick={escapeNo}
            className="px-6 py-3 rounded-full bg-muted text-muted-foreground font-semibold text-lg transition-all duration-200"
            style={{
              transform: `scale(${getNoSize()})`,
              ...(noPos ? { position: "fixed", top: noPos.top, left: noPos.left, zIndex: 50 } : {}),
            }}
          >
            No 🙄
          </button>
        )}
      </div>

      {/* Escape messages */}
      {messages.map((m) => (
        <EscapeMessage key={m.id} text={m.text} x={m.x} y={m.y} />
      ))}

      {/* Floating hearts near YES */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="fixed text-3xl float-up pointer-events-none z-20"
          style={{ left: `${h.x}%`, top: "55%" }}
        >
          💗
        </span>
      ))}

      {/* Corner text */}
      {showCornerText && (
        <p className="fixed bottom-4 right-4 text-xs text-muted-foreground opacity-70 fade-in z-10">
          This website was built under emotional pressure.
        </p>
      )}

      <FloatingHearts count={6} />
    </div>
  );
};

export default Index;
