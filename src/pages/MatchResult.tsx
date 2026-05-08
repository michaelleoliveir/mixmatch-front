import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, Music2, Sparkles } from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatch } from "@/utils/useMatch";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const ScoreRing = ({ value }: { value: number }) => {
  const size = 260;
  const stroke = 16;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const [count, setCount] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1600;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setCount(Math.round(p * value * 10) / 10);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl animate-pulse-glow" />
      <svg width={size} height={size} className="relative -rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(141 73% 42%)" />
            <stop offset="100%" stopColor="hsl(160 84% 60%)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="hsl(var(--secondary))" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 14px hsl(var(--primary) / 0.7))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-6xl md:text-7xl font-extrabold tabular-nums text-gradient">
          {count.toFixed(1)}%
        </span>
        <span className="mt-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold">
          In Sync
        </span>
      </div>
    </div>
  );
};

const SkeletonView = () => (
  <main className="md:ml-64 px-6 md:px-10 py-10 pb-28 md:pb-10 max-w-5xl">
    <Skeleton className="h-48 rounded-3xl bg-card mb-10" />
    <div className="flex justify-center mb-14">
      <Skeleton className="w-64 h-64 rounded-full bg-card" />
    </div>
    <Skeleton className="h-4 w-40 bg-card mb-5" />
    <div className="grid grid-cols-3 md:grid-cols-6 gap-5 mb-12">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-square rounded-full bg-card" />
          <Skeleton className="h-3 w-3/4 mx-auto bg-card" />
        </div>
      ))}
    </div>
    <Skeleton className="h-4 w-40 bg-card mb-5" />
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-16 rounded-xl bg-card" />
      ))}
    </div>
  </main>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="rounded-2xl glass border border-white/10 p-10 text-center">
    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
      <Music2 className="w-7 h-7 text-primary" />
    </div>
    <h3 className="text-lg font-bold mb-1">No matches yet</h3>
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

const MatchResult = () => {
  const [params] = useSearchParams();
  const isGuest = params.get("guest") === "1";
  const { data, loading } = useMatch();

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      {loading || !data ? (
        <SkeletonView />
      ) : (
        <main className="md:ml-64 px-6 md:px-10 py-10 pb-28 md:pb-10 max-w-5xl">
          {/* Hero */}
          <motion.section
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="relative rounded-3xl glass glow p-8 md:p-12 mb-10 overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-emerald-500/10 pointer-events-none" />
            <div className="relative">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                It's a Match
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                You and{" "}
                <span className="text-gradient">{data.owner_name}</span>
                <br />
                are{" "}
                <span className="text-primary">{data.match_percent}%</span> in sync
              </h1>
              <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
                A shared soundtrack of artists, tracks and vibes you both love.
              </p>
            </div>
          </motion.section>

          {/* Score */}
          <motion.section
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
            className="flex justify-center mb-16"
          >
            <ScoreRing value={data.match_percent} />
          </motion.section>

          {/* Common Artists */}
          <motion.section
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={2}
            className="mb-14"
          >
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Artists You Both Love
              </h2>
              <span className="text-xs text-muted-foreground">
                {data.common_data.artists.length} in common
              </span>
            </div>
            {data.common_data.artists.length === 0 ? (
              <EmptyState message="No common artists found between you two." />
            ) : (
              <div className="flex gap-5 overflow-x-auto pb-3 -mx-2 px-2 md:grid md:grid-cols-6 md:overflow-visible">
                {data.common_data.artists.map((a, i) => (
                  <motion.div
                    key={`${a.name}-${i}`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                    className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <img
                        src={a.photo}
                        alt={a.name}
                        loading="lazy"
                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-primary transition-all"
                      />
                    </div>
                    <span className="text-xs font-medium text-center max-w-[90px] truncate group-hover:text-primary transition-colors">
                      {a.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Common Tracks */}
          <motion.section
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={3}
            className="mb-14"
          >
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Tracks On Repeat
              </h2>
              <span className="text-xs text-muted-foreground">
                {data.common_data.tracks.length} in common
              </span>
            </div>
            {data.common_data.tracks.length === 0 ? (
              <EmptyState message="No shared tracks yet — keep listening!" />
            ) : (
              <ul className="space-y-2">
                {data.common_data.tracks.map((t, i) => (
                  <motion.li
                    key={`${t.name}-${i}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.35 }}
                    className="flex items-center gap-4 p-3 rounded-xl glass border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                  >
                    <span className="w-5 text-xs text-muted-foreground tabular-nums text-center">
                      {i + 1}
                    </span>
                    <img
                      src={t.photo}
                      alt={t.album}
                      loading="lazy"
                      className="w-12 h-12 md:w-14 md:h-14 rounded-md object-cover shadow-md"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm md:text-base truncate group-hover:text-primary transition-colors">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {t.artist} • {t.album}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
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
      )}
    </div>
  );
};

export default MatchResult;
