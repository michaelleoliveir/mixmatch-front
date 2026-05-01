import { Button } from "@/components/ui/button";
import HeroVisual from "@/components/HeroVisual";
import {
  Brain,
  Sparkles,
  Music,
  BarChart3,
  Wand2,
  TrendingUp,
  Mic2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { features, previewArtists, previewTracks, promptExamples, steps } from "@/mocks/indexMock";

const handleLogin = () => {
  window.location.href = import.meta.env.VITE_BACKEND_API + '/auth/spotify/login'
}

const Index = () => {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('auth_error')) {
      toast.error("Access Denied", {
        description: "You must be logged in to create playlists.",
        duration: 5000,
      });

      sessionStorage.removeItem('auth_error')
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('spotify_token');

    if (token) {
      window.location.href = '/dashboard'
    } else {
      setIsChecking(false)
    }
  }, []);

  if (isChecking) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-primary">
              <Sparkles className="w-3.5 h-3.5" /> AI Music Management Ecosystem
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Sync Your Music{" "}
              <span className="text-gradient">to Your Mood</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              MixMatch uses Artificial Intelligence to analyze your vibe and
              instantly create the perfect Spotify playlist. Discover your
              personalized insights and manage your favorite tracks all in one
              place.
            </p>
            <Button variant="hero" onClick={handleLogin}>
              <Music className="w-6 h-6" />
              Login with Spotify
            </Button>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-md mx-auto">
            Three powerful features that make your listening experience magical.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="glass rounded-2xl p-8 group hover:glow transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Dashboard Preview */}
      <section className="py-24 px-4">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-primary">
              <BarChart3 className="w-3.5 h-3.5" /> Insights Dashboard
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Your music taste,{" "}
              <span className="text-primary">visualized</span>
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Get a sneak peek at your personal listening profile. MixMatch
              surfaces your top tracks and most-played artists so you always
              know what's shaping your sound.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">
                  <span className="text-foreground font-medium">Top tracks</span> with explicit badges and album context
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mic2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">
                  <span className="text-foreground font-medium">Top artists</span> ranked from your real Spotify data
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">
                  <span className="text-foreground font-medium">Live updates</span> that refresh as your taste evolves
                </span>
              </li>
            </ul>
          </div>

          {/* Mockup */}
          <div className="order-1 lg:order-2">
            <div className="glass rounded-3xl p-6 md:p-7 glow relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between mb-5 relative">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Profile</p>
                  <p className="font-bold text-lg">Your Top Tracks</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary font-semibold">
                  Live
                </span>
              </div>

              <div className="space-y-2 relative">
                {previewTracks.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <span className="w-5 text-xs text-muted-foreground tabular-nums text-center">
                      {i + 1}
                    </span>
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary/40 to-primary/10 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">{t.name}</span>
                        {t.explicit && (
                          <span className="text-[9px] font-bold bg-muted text-muted-foreground px-1.5 py-0.5 rounded leading-none">
                            E
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{t.artist}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/5 relative">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                  Top Artists
                </p>
                <div className="flex gap-3">
                  {previewArtists.map((a) => (
                    <div key={a.name} className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 to-primary/10 flex items-center justify-center text-xs font-bold ring-1 ring-primary/30">
                        {a.initials}
                      </div>
                      <span className="text-[11px] text-muted-foreground truncate w-full text-center">
                        {a.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Playlist Creator */}
      <section className="py-24 px-4">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          {/* Mockup */}
          <div>
            <div className="glass rounded-3xl p-6 md:p-7 glow relative overflow-hidden">
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-4 relative">
                <Wand2 className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  AI Playlist Creator
                </span>
              </div>
              <div className="rounded-2xl bg-background/60 border border-white/5 p-4 mb-4 relative">
                <p className="text-[11px] text-muted-foreground mb-2">Your prompt</p>
                <p className="font-medium">"Rainy day jazz vibe with a hint of soul"</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-5 relative">
                {promptExamples.map((p) => (
                  <span
                    key={p}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground border border-white/5"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <Button variant="default" className="w-full" onClick={handleLogin}>
                <Sparkles className="w-4 h-4" />
                Generate with AI
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-primary">
              <Wand2 className="w-3.5 h-3.5" /> AI-Powered Playlist Creator
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              From a sentence to a{" "}
              <span className="text-gradient">full playlist</span>
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Our AI engine understands natural language. Type a vibe, a moment,
              or an activity — like <span className="text-foreground font-medium">"Rainy day jazz vibe"</span> —
              and MixMatch builds a tailored playlist directly into your Spotify
              library, ready to play.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4">
                <Brain className="w-5 h-5 text-primary mb-2" />
                <p className="font-semibold text-sm mb-1">Natural language</p>
                <p className="text-xs text-muted-foreground">No tags, no filters. Just describe it.</p>
              </div>
              <div className="glass rounded-xl p-4">
                <Music className="w-5 h-5 text-primary mb-2" />
                <p className="font-semibold text-sm mb-1">Saved to Spotify</p>
                <p className="text-xs text-muted-foreground">Created in your account, instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">
            From Vibe to Playlist in{" "}
            <span className="text-primary">4 Easy Steps</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-md mx-auto">
            It takes less than a minute to get your perfect playlist.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center gap-4 isolate">

                <div className="w-16 h-16 rounded-2xl bg-[#121212] border border-primary/20 flex items-center justify-center relative z-20">
                  <s.icon className="w-7 h-7 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground max-w-[180px]">
                  {s.label}
                </p>

                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full z-10">
                    <div className="w-full border-t-2 border-dashed border-primary/20 h-px"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container">
          <div className="glass rounded-3xl p-12 md:p-16 text-center glow">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for the <span className="text-primary">perfect mix</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Join thousands of music lovers who let AI enhance their listening
              experience every day.
            </p>
            <Button variant="hero" onClick={handleLogin}>
              <Music className="w-5 h-5" />
              Start Creating with Spotify
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <span>
            <span className="text-primary font-semibold">Michaelle </span>Oliveira © 2026
          </span>
          <span>Powered by AI & Spotify</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
