import { Link, useSearchParams } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/useAuth";
import { useMatch } from "@/utils/useMatch";
import { ScoreRing } from "@/components/ScoreRing";
import { SkeletonView } from "@/components/SkeletonView";
import { EmptyState } from "@/components/EmptyState";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const getMatchMessage = (percent: number) => {
  if (percent >= 90) return "Basically musical soulmates. This is rare!";
  if (percent >= 70) return "You guys share some serious taste. High vibes only!";
  if (percent >= 40) return "A solid overlap! You'd definitely agree on the car playlist.";
  if (percent >= 10) return "A few hits in common, but plenty of room to explore.";
  if (percent > 0) return "Different worlds, but hey, opposites attract!";
  return "Absolute zero! You two have completely different taste... and that's actually impressive.";
};

const MatchResult = () => {
  const { data, loading } = useMatch();
  const { isAuthLoading } = useAuth();


  if (isAuthLoading) {
    return <div className="min-h-screen bg-background" />;
  }

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
                {data.match_percent > 0 ? "It's a Match" : "Pure Discovery"}
              </span>

              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                {data.match_percent > 0 ? (
                  <>
                    You and <span className="text-gradient">{data.owner_name}</span>
                    <br />
                    are <span className="text-primary">{data.match_percent}%</span> in sync
                  </>
                ) : (
                  <>
                    You and <span className="text-gradient">{data.owner_name}</span>
                    <br />
                    live in <span className="text-primary">different</span> dimensions
                  </>
                )}
              </h1>

              <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl mx-auto italic">
                "{getMatchMessage(data.match_percent)}"
              </p>

              {data.match_percent === 0 && (
                <p className="mt-2 text-xs text-primary/70">
                  No common ground found. Time to introduce each other to something new!
                </p>
              )}
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
                {data.artists_match.length} in common
              </span>
            </div>
            {data.artists_match.length === 0 ? (
              <EmptyState message="No common artists found between you two." />
            ) : (
              <div className="flex gap-5 overflow-x-auto pb-3 -mx-2 px-2 md:grid md:grid-cols-6 md:overflow-visible">
                {data.artists_match.map((a, i) => (
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
                {data.tracks_match.length} in common
              </span>
            </div>
            {data.tracks_match.length === 0 ? (
              <EmptyState message="No shared tracks yet — keep listening!" />
            ) : (
              <ul className="space-y-2">
                {data.tracks_match.map((t, i) => (
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
            className="rounded-2xl text-start"
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/match">
                <ArrowLeft className="w-4 h-4" />
                Back to Hub
              </Link>
            </Button>
          </motion.section>
        </main>
      )}
    </div>
  );
};

export default MatchResult;
