import { useEffect, useState } from "react";

interface LoadingPageProps {
  message?: string;
}

const LoadingPage = ({ message = "Curating your perfect mix..." }: LoadingPageProps) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Animated equalizer */}
      <div className="relative mb-12">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/30 rounded-full blur-[60px] animate-pulse-glow" />
        
        {/* Sound wave bars */}
        <div className="relative flex items-end justify-center gap-2 h-24">
          {[...Array(7)].map((_, i) => {
            const heights = [40, 70, 55, 90, 55, 70, 40];
            const delays = [0, 0.1, 0.2, 0.3, 0.2, 0.1, 0];
            return (
              <div
                key={i}
                className="w-3 bg-primary rounded-full animate-pulse"
                style={{
                  height: `${heights[i]}%`,
                  animation: `equalizer 1.2s ease-in-out infinite`,
                  animationDelay: `${delays[i]}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Loading text */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          <span className="text-foreground">{message}</span>
          <span className="text-primary">{dots}</span>
        </h2>
        <p className="text-muted-foreground text-sm">
          Analyzing your vibe and matching tracks
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mt-12 w-64">
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full animate-loading-bar"
            style={{
              width: "100%",
            }}
          />
        </div>
      </div>

      {/* Rotating rings decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[200, 280, 360].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-primary/10 animate-spin"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `-${size / 2}px`,
                left: `-${size / 2}px`,
                animationDuration: `${15 + i * 5}s`,
                animationDirection: i % 2 === 0 ? "normal" : "reverse",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes equalizer {
          0%, 100% { transform: scaleY(0.5); opacity: 0.6; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
