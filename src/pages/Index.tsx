import { Button } from "@/components/ui/button";
import HeroVisual from "@/components/HeroVisual";
import { Brain, Sparkles, Music, LogIn, MessageSquare, Cpu, Headphones } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Mood Detection",
    desc: "Describe your mood, from 'calm morning' to 'high-energy gym session', and our AI understands.",
  },
  {
    icon: Sparkles,
    title: "Personalized Curation",
    desc: "We blend your favorite tracks with new discoveries that match your vibe perfectly.",
  },
  {
    icon: Music,
    title: "Direct Spotify Integration",
    desc: "Playlists are created directly in your account in seconds. No friction, just music.",
  },
];

const steps = [
  { icon: LogIn, label: "Log in with your Spotify account" },
  { icon: MessageSquare, label: "Describe your current mood or activity" },
  { icon: Cpu, label: "Our AI curates and generates the playlist" },
  { icon: Headphones, label: "The playlist appears instantly in your Spotify app" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Sync Your Music{" "}
              <span className="text-gradient">to Your Mood</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              MixMatch uses Artificial Intelligence to analyze your current vibe
              and instantly create the perfect Spotify playlist from your library
              and discoveries.
            </p>
            <Button variant="hero">
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

      {/* Steps */}
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
              /* Adicionamos isolate para criar um novo contexto de camadas apenas aqui dentro */
              <div key={i} className="relative flex flex-col items-center text-center gap-4 isolate">

                {/* O ícone precisa ser z-10 ou maior */}
                <div className="w-16 h-16 rounded-2xl bg-[#121212] border border-primary/20 flex items-center justify-center relative z-20">
                  <s.icon className="w-7 h-7 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground max-w-[180px]">
                  {s.label}
                </p>

                {/* A linha agora tem z-10 (fica entre o fundo e o ícone) */}
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
            <Button variant="hero">
              <Music className="w-5 h-5" />
              Start Curating with Spotify
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
