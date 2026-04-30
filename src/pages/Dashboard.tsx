import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface Profile {
  display_name: string;
  email: string;
  followers: number;
  icon: string;
}
interface Track {
  name: string;
  artist: string;
  album_name: string;
  album_cover: string;
  explicit: boolean;
}
interface Artist {
  name: string;
  id: string;
  image: string;
}
interface DashboardData {
  profile: Profile;
  tracks: Track[];
  artists: Artist[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
  }),
};

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("spotify_token");
    const api = import.meta.env.VITE_BACKEND_API;
    if (!token || !api) {
      // Demo fallback so the page still renders gracefully
      setTimeout(() => {
        setData({
          profile: {
            display_name: "Music Lover",
            email: "you@mixmatch.app",
            followers: 0,
            icon: "",
          },
          tracks: [],
          artists: [],
        });
        setLoading(false);
      }, 800);
      return;
    }

    fetch(`${api}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((json) => setData(json))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="md:ml-64 px-6 md:px-10 py-10 pb-28 md:pb-10 max-w-6xl">
        {/* Hero / Spotlight */}
        {loading || !data ? (
          <HeroSkeleton />
        ) : (
          <motion.section
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-14"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl" />
              {data.profile.icon ? (
                <img
                  src={data.profile.icon}
                  alt={data.profile.display_name}
                  className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover ring-2 ring-primary/40"
                />
              ) : (
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-secondary flex items-center justify-center text-4xl font-bold ring-2 ring-primary/40">
                  {data.profile.display_name?.charAt(0)}
                </div>
              )}
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Profile
              </p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3">
                {data.profile.display_name}
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 bg-secondary px-3 py-1 rounded-full">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium text-foreground">
                    {data.profile.followers}
                  </span>
                  followers
                </span>
                <span className="hidden sm:inline">{data.profile.email}</span>
              </div>
            </div>
          </motion.section>
        )}

        {/* Top Tracks */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-5">Top 10 Tracks</h2>
          <div className="bg-card rounded-2xl p-3 border border-white/5">
            {loading || !data
              ? Array.from({ length: 6 }).map((_, i) => (
                  <TrackSkeleton key={i} />
                ))
              : data.tracks.slice(0, 10).map((track, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="show"
                    variants={fadeUp}
                    className="flex items-center gap-4 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <span className="w-6 text-sm text-muted-foreground tabular-nums text-center">
                      {i + 1}
                    </span>
                    <img
                      src={track.album_cover}
                      alt={track.album_name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate group-hover:text-primary transition-colors">
                          {track.name}
                        </span>
                        {track.explicit && (
                          <span className="text-[10px] font-bold bg-muted text-muted-foreground px-1.5 py-0.5 rounded leading-none">
                            E
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {track.artist}
                      </p>
                    </div>
                    <span className="hidden sm:block text-sm text-muted-foreground truncate max-w-[200px]">
                      {track.album_name}
                    </span>
                  </motion.div>
                ))}
          </div>
        </section>

        {/* Top Artists */}
        <section>
          <h2 className="text-2xl font-bold mb-5">Top 10 Artists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {loading || !data
              ? Array.from({ length: 10 }).map((_, i) => (
                  <ArtistSkeleton key={i} />
                ))
              : data.artists.slice(0, 10).map((artist, i) => (
                  <motion.div
                    key={artist.id}
                    custom={i}
                    initial="hidden"
                    animate="show"
                    variants={fadeUp}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-square mb-3 overflow-hidden rounded-full">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-2 ring-primary shadow-[0_0_30px_hsl(141_73%_42%/0.6)]" />
                    </div>
                    <p className="text-center text-sm font-semibold truncate group-hover:text-primary transition-colors">
                      {artist.name}
                    </p>
                  </motion.div>
                ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const HeroSkeleton = () => (
  <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-14">
    <Skeleton className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-card" />
    <div className="space-y-3 w-full max-w-sm">
      <Skeleton className="h-3 w-20 bg-card" />
      <Skeleton className="h-12 w-64 bg-card" />
      <Skeleton className="h-6 w-40 bg-card" />
    </div>
  </div>
);

const TrackSkeleton = () => (
  <div className="flex items-center gap-4 px-3 py-2.5">
    <Skeleton className="w-6 h-4 bg-muted" />
    <Skeleton className="w-12 h-12 rounded-md bg-muted" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-1/2 bg-muted" />
      <Skeleton className="h-3 w-1/3 bg-muted" />
    </div>
  </div>
);

const ArtistSkeleton = () => (
  <div>
    <Skeleton className="aspect-square rounded-full bg-card mb-3" />
    <Skeleton className="h-4 w-3/4 mx-auto bg-card" />
  </div>
);

export default Dashboard;
