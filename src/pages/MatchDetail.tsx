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

interface MatchDetailData {
  user: { name: string; icon: string };
  score: number;
  registered_at: string;
  artists_match: { name: string; photo: string }[];
  tracks_match: { name: string; artist: string; album: string; photo: string }[];
}

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
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

// Mock fetch — replace with real API later
const mockData: MatchDetailData = {
  user: { name: "Sofia Martins", icon: "https://i.pravatar.cc/160?img=47" },
  score: 87.4,
  registered_at: "2026-06-17T12:00:00Z",
  artists_match: [
    { name: "Tame Impala", photo: "https://i.scdn.co/image/ab6761610000e5eb490d11ab2cf06d75c6cb29ee" },
    { name: "Arctic Monkeys", photo: "https://i.scdn.co/image/ab6761610000e5eb7da39dea0a72f581535fb11f" },
    { name: "The Weeknd", photo: "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae" },
    { name: "Daft Punk", photo: "https://i.scdn.co/image/ab6761610000e5eb6c576c5bd1c1a4d52f7d9931" },
    { name: "Glass Animals", photo: "https://i.scdn.co/image/ab6761610000e5eb1c61124e9275b6f10b9a8aa3" },
    { name: "Phoenix", photo: "https://i.scdn.co/image/ab6761610000e5ebb29f5e7b86df1eaeec1bd54b" },
  ],
  tracks_match: [
    { name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", photo: "https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79" },
    { name: "Blinding Lights", artist: "The Weeknd", album: "After Hours", photo: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36" },
    { name: "Do I Wanna Know?", artist: "Arctic Monkeys", album: "AM", photo: "https://i.scdn.co/image/ab67616d0000b273f50aaecbf26c5dccf6c4b50e" },
    { name: "Heat Waves", artist: "Glass Animals", album: "Dreamland", photo: "https://i.scdn.co/image/ab67616d0000b2739e495fb707973f3390850eea" },
    { name: "Get Lucky", artist: "Daft Punk", album: "Random Access Memories", photo: "https://i.scdn.co/image/ab67616d0000b273b89e924e2da55ff7c0a4d4ab" },
  ],
};

const MatchDetail = () => {
  useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MatchDetailData | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <SkeletonView />
      </div>
    );
  }

  if (!data) {
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
                src={data.user.icon}
                alt={data.user.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/40"
              />
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  You & <span className="text-gradient">{data.user.name}</span>
                </h1>
                <p className="text-muted-foreground text-sm mt-1">{formatDate(data.registered_at)}</p>
              </div>
            </div>

            <div className={cn("inline-block text-sm font-bold tabular-nums", scoreColor(data.score))}>
              {data.score.toFixed(1)}% compatibility
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
          <ScoreRing value={data.score} />
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
                    className="w-12 h-12 rounded-md object-cover shadow-md"
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
