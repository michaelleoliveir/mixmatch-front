const HeroVisual = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow background */}
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
      
      {/* Concentric rings */}
      <svg viewBox="0 0 400 400" className="w-full h-full animate-float">
        <defs>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(141, 73%, 42%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(141, 73%, 55%)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Sound wave rings */}
        {[120, 150, 180].map((r, i) => (
          <circle
            key={i}
            cx="200" cy="200" r={r}
            fill="none"
            stroke="url(#greenGrad)"
            strokeWidth={2 - i * 0.5}
            opacity={0.6 - i * 0.15}
            strokeDasharray={`${10 + i * 5} ${8 + i * 3}`}
          />
        ))}
        
        {/* Equalizer bars */}
        {[140, 165, 190, 215, 240, 260].map((x, i) => {
          const h = [50, 80, 60, 90, 45, 70][i];
          return (
            <rect
              key={i}
              x={x} y={200 - h / 2}
              width="8" height={h}
              rx="4"
              fill="hsl(141, 73%, 42%)"
              opacity={0.5 + i * 0.08}
            >
              <animate
                attributeName="height"
                values={`${h};${h * 1.4};${h * 0.7};${h}`}
                dur={`${1.5 + i * 0.2}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values={`${200 - h / 2};${200 - (h * 1.4) / 2};${200 - (h * 0.7) / 2};${200 - h / 2}`}
                dur={`${1.5 + i * 0.2}s`}
                repeatCount="indefinite"
              />
            </rect>
          );
        })}
        
        {/* Center circle */}
        <circle cx="200" cy="200" r="40" fill="hsl(141, 73%, 42%)" opacity="0.15" />
        <circle cx="200" cy="200" r="20" fill="hsl(141, 73%, 42%)" opacity="0.3" />
      </svg>
    </div>
  );
};

export default HeroVisual;
