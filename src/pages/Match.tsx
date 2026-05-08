import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Check, ChevronRight, Copy, Heart, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMatch } from "@/utils/useMatch";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

const mockHistory = [
  { id: "1", name: "Sofia Martins", date: "May 2, 2026", score: 92, avatar: "https://i.pravatar.cc/120?img=47" },
  { id: "2", name: "Lucas Pereira", date: "Apr 28, 2026", score: 78, avatar: "https://i.pravatar.cc/120?img=12" },
  { id: "3", name: "Aiko Tanaka", date: "Apr 21, 2026", score: 65, avatar: "https://i.pravatar.cc/120?img=32" },
  { id: "4", name: "Marco Silva", date: "Apr 14, 2026", score: 54, avatar: "https://i.pravatar.cc/120?img=15" },
  { id: "5", name: "Elena Rossi", date: "Apr 03, 2026", score: 41, avatar: "https://i.pravatar.cc/120?img=49" },
];

const Match = () => {
  const [copied, setCopied] = useState(false);

  const {link} = useMatch();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Compare your music taste with mine on MixMatch: ${link}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const scoreColor = (score: number) =>
    score >= 80 ? "text-primary" : score >= 60 ? "text-emerald-300" : "text-muted-foreground";

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
              <Heart className="w-3.5 h-3.5" />
              Mix & Match Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Find Your Musical <span className="text-gradient">Soulmate</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              Invite friends to compare your music tastes and discover your compatibility score.
            </p>
          </div>
        </motion.section>

        {/* Share Action */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={1}
          className="rounded-2xl glass p-6 md:p-8 mb-12 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Your Match Link
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              readOnly
              value={link || 'Generating link...'}
              className="flex-1 h-12 rounded-full bg-black/40 border-white/10 text-sm font-mono text-foreground/90 px-5"
            />
            <div className="flex gap-3">
              <Button onClick={handleCopy} variant="default" size="lg" className="flex-1 md:flex-none">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy Link"}
              </Button>
              <Button onClick={handleWhatsApp} variant="outline" size="lg" className="flex-1 md:flex-none">
                <Share2 className="w-4 h-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        </motion.section>

        {/* History */}
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Match History</h2>
            <span className="text-xs text-muted-foreground">{mockHistory.length} matches</span>
          </div>

          <div className="bg-card rounded-2xl border border-white/5 p-2">
            {mockHistory.map((m, i) => (
              <motion.div
                key={m.id}
                custom={i}
                initial="hidden"
                animate="show"
                variants={fadeUp}
              >
                <Link
                  to="/match/result"
                  className="flex items-center gap-4 px-3 md:px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-12 h-12 rounded-full object-cover ring-1 ring-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate group-hover:text-primary transition-colors">
                      {m.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{m.date}</p>
                  </div>
                  <div className={cn("text-2xl md:text-3xl font-extrabold tabular-nums", scoreColor(m.score))}>
                    {m.score}%
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              Load more matches
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Match;
