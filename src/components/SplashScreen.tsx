import { useState } from "react";

interface SplashScreenProps {
    onEnter: () => void;
}

const SplashScreen = ({ onEnter }: SplashScreenProps) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleEnter = () => {
        setIsAnimating(true);
        setTimeout(() => {
            onEnter();
        }, 800);
    };

    return (
        <div
            className={`fixed inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 flex items-center justify-center transition-all duration-700 z-50 ${isAnimating ? "opacity-0 scale-110" : "opacity-100 scale-100"
                }`}
        >
            <div className="text-center space-y-8 px-4">
                <div className="animate-pulse">
                    <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-white drop-shadow-2xl mb-4">
                        💗
                    </h1>
                </div>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-8">
                    Ready for something special?
                </h2>

                <button
                    onClick={handleEnter}
                    className="px-12 py-6 bg-white text-pink-600 font-bold text-2xl sm:text-3xl rounded-full shadow-2xl hover:scale-110 hover:shadow-pink-300/50 transition-all duration-300 active:scale-95 animate-bounce"
                >
                    Tap to Enter ✨
                </button>

                <p className="text-lg sm:text-xl text-white/80 font-medium mt-4">
                    (You know you want to...)
                </p>
            </div>

            {/* Floating hearts animation */}
            {Array.from({ length: 15 }).map((_, i) => (
                <span
                    key={i}
                    className="fixed text-4xl opacity-30 animate-pulse pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                >
                    💕
                </span>
            ))}
        </div>
    );
};

export default SplashScreen;
