import { Skeleton } from "./ui/skeleton";

export const TrackSkeleton = () => (
    <div className="flex items-center gap-4 px-3 py-2.5">
        <Skeleton className="w-6 h-4 bg-muted" />
        <Skeleton className="w-12 h-12 rounded-md bg-muted" />
        <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2 bg-muted" />
            <Skeleton className="h-3 w-1/3 bg-muted" />
        </div>
    </div>
);