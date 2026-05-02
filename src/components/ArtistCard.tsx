import { cn } from "@/lib/utils";
import { Artist } from "@/utils/useLoadData";
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: "easeOut" as const },
    },
};

export function ArtistCard({ artist, index }: { artist: Artist; index: number }) {
    return (
        <motion.div
            variants={itemVariants}
            className="group flex cursor-pointer flex-col items-center gap-2.5"
        >
            <div className="relative w-full aspect-square">
                <div className="relative w-full aspect-square overflow-hidden rounded-full">
                    <img
                        src={artist.image}
                        alt={artist.name}
                        className="absolute inset-0 h-full w-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 rounded-full opacity-0 ring-2 ring-primary shadow-[0_0_28px_hsl(141_73%_42%/0.55)] transition-opacity duration-300 group-hover:opacity-100" />
                    <span className={cn(
                        "absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold backdrop-blur-md",
                        index < 3 ? "bg-primary text-black" : "border border-white/10 bg-black/70 text-white"
                    )}>
                        {index + 1}
                    </span>
                </div>

                <span
                    className={cn(
                        "absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold backdrop-blur-md",
                        index < 3
                            ? "bg-primary text-black"
                            : "border border-white/10 bg-black/70 text-white"
                    )}
                >
                    {index + 1}
                </span>
            </div>

            <div className="w-full space-y-0.5 text-center">
                <p className="truncate text-sm font-semibold transition-colors group-hover:text-primary">
                    {artist.name}
                </p>
            </div>
        </motion.div>
    );
}