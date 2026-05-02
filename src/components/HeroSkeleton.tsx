import { Skeleton } from "./ui/skeleton";

export const HeroSkeleton = () => (
    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-14">
        <Skeleton className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-card" />
        <div className="space-y-3 w-full max-w-sm">
            <Skeleton className="h-3 w-20 bg-card" />
            <Skeleton className="h-12 w-64 bg-card" />
            <Skeleton className="h-6 w-40 bg-card" />
        </div>
    </div>
);