import { Link, useParams } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/ScoreRing";
import { SkeletonView } from "@/components/SkeletonView";
import { EmptyState } from "@/components/EmptyState";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRanking } from "@/utils/useRanking";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const scoreColor = (score: number) =>
  score >= 80 ? "text-primary" : score >= 60 ? "text-emerald-300" : "text-muted-foreground";

const formatDate = (iso: string) =>
  new Date(iso.replace(/(\.\d{3})\d+/, '$1'))
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

const MatchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const { rankingDetails, rankingDetailResponse } = useRanking();

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      await rankingDetailResponse(id);
      setLoading(false);
    };
    load();
  }, [id, rankingDetailResponse]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <SkeletonView />
      </div>
    );
  }

  if (!rankingDetails) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <main className="md:ml-64 px-6 md:px-10 py-10 pb-28 md:pb-10 max-w-5xl">
          <EmptyState message="We couldn't load this match. It may have been removed." />
          <div className="mt-6">
            <Button asChild variant="outline" size="lg">
              <Link to="/match"><ArrowLeft className="w-4 h-4" />Back to Hub</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="md:ml-64 px-6 md:px-10 py-10 pb-28 md:pb-10 max-w-5xl">
        {/* Hero */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl glass glow p-8 md:p-12 mb-10"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-5">
              <Trophy className="w-3.5 h-3.5" />
              Match Detail
            </div>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={rankingDetails.owner.icon}
                alt={rankingDetails.owner.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/40"
              />
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  You & <span className="text-gradient">{rankingDetails.visitor.name}</span>
                </h1>
                <p className="text-muted-foreground text-sm mt-1">{formatDate(rankingDetails.date)}</p>
              </div>
            </div>

            <div className={cn("inline-block text-sm font-bold tabular-nums", scoreColor(rankingDetails.score))}>
              {rankingDetails.score.toFixed(1)}% compatibility
            </div>
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
          <ScoreRing value={rankingDetails.score} />
        </motion.section>

        {/* Artists */}
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
              {(rankingDetails.artists_match ?? []).length} in common
            </span>
          </div>

          {(rankingDetails.artists_match ?? []).length === 0 ? (
            <EmptyState message="No common artists found between you two." />
          ) : (
            <div className="flex gap-5 overflow-x-auto pb-3 -mx-2 px-2 md:grid md:grid-cols-6 md:overflow-visible">
              {(rankingDetails.artists_match ?? []).map((a, i) => (
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

        {/* Tracks */}
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
              {(rankingDetails.tracks_match ?? []).length} in common
            </span>
          </div>

          {(rankingDetails.tracks_match ?? []).length === 0 ? (
            <EmptyState message="No shared tracks yet — keep listening!" />
          ) : (
            <ul className="space-y-2">
              {(rankingDetails.tracks_match ?? []).map((t, i) => (
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
                    className="w-12 h-12 rounded-md object-cover shadow-md"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm md:text-base truncate group-hover:text-primary transition-colors">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t.name} • {t.album}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.section>

        {/* Back */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={4}
        >
          <Button asChild variant="outline" size="lg">
            <Link to="/match">
              <ArrowLeft className="w-4 h-4" />
              Back to Hub
            </Link>
          </Button>
        </motion.section>
      </main>
    </div>
  );
};

export default MatchDetail;
