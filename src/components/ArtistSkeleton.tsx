import { Skeleton } from "./ui/skeleton";

export const ArtistSkeleton = () => (
    <div>
        <Skeleton className="aspect-square rounded-full bg-card mb-3" />
        <Skeleton className="h-4 w-3/4 mx-auto bg-card" />
    </div>
);