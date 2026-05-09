import { useSpring, useTransform, motion } from "framer-motion";
import { useState, useEffect } from "react";

export const ScoreRing = ({ value }: { value: number }) => {
    const size = 280;
    const stroke = 14;
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;

    const springValue = useSpring(0, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001
    });

    const strokeDashoffset = useTransform(springValue, [0, 100], [c, c - (value / 100) * c]);

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        springValue.set(value);
        return springValue.on("change", (latest) => {
            setDisplayValue(latest);
        });
    }, [value, springValue]);

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>

            <div className="absolute inset-0 rounded-full bg-primary/20 blur-[60px] animate-pulse" />

            <svg width={size} height={size} className="relative -rotate-90 drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
                <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1DB954" /> {/* Spotify Green */}
                        <stop offset="100%" stopColor="#1ED760" />
                    </linearGradient>

                    <filter id="innerGlow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <circle
                    cx={size / 2} cy={size / 2} r={r}
                    stroke="currentColor"
                    className="text-white/5"
                    strokeWidth={stroke}
                    fill="none"
                />

                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    stroke="url(#ringGrad)"
                    strokeWidth={stroke}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={c}
                    style={{ strokeDashoffset }}
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-center"
                >
                    <span className="text-6xl md:text-7xl font-black tabular-nums tracking-tighter text-white drop-shadow-sm">
                        {displayValue.toFixed(1)}<span className="text-3xl text-primary">%</span>
                    </span>

                    <div className="flex flex-col items-center gap-1 mt-1">
                        <div className="h-[2px] w-8 bg-primary/50 rounded-full" />
                        <span className="text-[10px] uppercase tracking-[0.4em] text-primary/80 font-bold">
                            In Sync
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};