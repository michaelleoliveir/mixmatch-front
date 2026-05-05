import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const TARGET_SCORE = 92;

const sharedArtists = [
  { name: "Tame Impala", image: "https://i.pravatar.cc/200?img=11" },
  { name: "The Weeknd", image: "https://i.pravatar.cc/200?img=14" },
  { name: "Daft Punk", image: "https://i.pravatar.cc/200?img=22" },
  { name: "Arctic Monkeys", image: "https://i.pravatar.cc/200?img=33" },
  { name: "ODESZA", image: "https://i.pravatar.cc/200?img=41" },
  { name: "FKA twigs", image: "https://i.pravatar.cc/200?img=44" },
];

const sharedGenres = ["Indie Rock", "Synthwave", "Alt Pop", "Electronic", "Lo-fi", "Dream Pop"];

const ScoreRing = ({ value }: { value: number }) => {
  const size = 240;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-primary/25 blur-3xl" />
      <svg width={size} height={size} className="relative -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="hsl(var(--secondary))"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="hsl(var(--primary))"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 12px hsl(var(--primary) / 0.6))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-6xl font-extrabold tabular-nums text-foreground">{value}%</span>
        <span className="mt-1 text-xs uppercase tracking-[0.3em] text-primary font-semibold">
          Match!
        </span>
      </div>
    </div>
  );
};

const MatchResult = () => {
  const [params] = useSearchParams();
  const isGuest = params.get("guest") === "1";
  const [count, setCount] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1600;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setCount(Math.round(p * TARGET_SCORE));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="md:ml-64 px-6 md:px-10 py-10 pb-28 md:pb-10 max-w-5xl">
        {/* Spotlight */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative rounded-3xl glass glow p-8 md:p-12 mb-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative flex flex-col items-center">
            <div className="flex items-center justify-center gap-6 md:gap-10 mb-2">
              <img
                src="https://i.pravatar.cc/160?img=5"
                alt="You"
                className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover ring-2 ring-primary/60 shadow-[0_0_30px_hsl(141_73%_42%/0.5)]"
              />
              <div className="relative h-1 w-16 md:w-28 bg-gradient-to-r from-primary via-emerald-300 to-primary rounded-full">
                <div className="absolute inset-0 bg-primary blur-md opacity-70 rounded-full" />
              </div>
              <img
                src="https://i.pravatar.cc/160?img=47"
                alt="Sofia"
                className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover ring-2 ring-primary/60 shadow-[0_0_30px_hsl(141_73%_42%/0.5)]"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">You & Sofia Martins</p>
          </div>
        </motion.section>

        {/* Score */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={1}
          className="flex justify-center mb-14"
        >
          <ScoreRing value={count} />
        </motion.section>

        {/* Common Artists */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={2}
          className="mb-12"
        >
          <h2 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">
            Both of you love
          </h2>
          <div className="flex gap-5 overflow-x-auto pb-3 -mx-2 px-2 md:grid md:grid-cols-6 md:overflow-visible">
            {sharedArtists.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
                className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={a.image}
                    alt={a.name}
                    className="relative w-20 h-20 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-primary transition-all"
                  />
                </div>
                <span className="text-xs font-medium text-center max-w-[80px] truncate group-hover:text-primary transition-colors">
                  {a.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Genres */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={3}
          className="mb-14"
        >
          <h2 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">
            Shared Musical Vibe
          </h2>
          <div className="flex flex-wrap gap-3">
            {sharedGenres.map((g, i) => (
              <motion.span
                key={g}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.05, duration: 0.3 }}
                className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold"
              >
                {g}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={4}
          className="rounded-2xl glass p-8 text-center border border-white/10"
        >
          {isGuest ? (
            <>
              <h3 className="text-2xl font-bold mb-2">Curious about your own taste?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Connect Spotify and unlock your personal MixMatch dashboard.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/">
                  <Sparkles className="w-4 h-4" />
                  Create My Own Dashboard
                </Link>
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" size="lg">
              <Link to="/match">
                <ArrowLeft className="w-4 h-4" />
                Back to Hub
              </Link>
            </Button>
          )}
        </motion.section>
      </main>
    </div>
  );
};

export default MatchResult;
