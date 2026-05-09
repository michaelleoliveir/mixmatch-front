import { Skeleton } from "./ui/skeleton";

export const SkeletonView = () => (
    <main className="md:ml-64 px-6 md:px-10 py-10 pb-28 md:pb-10 max-w-5xl">
        <Skeleton className="h-48 rounded-3xl bg-card mb-10" />
        <div className="flex justify-center mb-14">
            <Skeleton className="w-64 h-64 rounded-full bg-card" />
        </div>
        <Skeleton className="h-4 w-40 bg-card mb-5" />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-5 mb-12">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square rounded-full bg-card" />
                    <Skeleton className="h-3 w-3/4 mx-auto bg-card" />
                </div>
            ))}
        </div>
        <Skeleton className="h-4 w-40 bg-card mb-5" />
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-xl bg-card" />
            ))}
        </div>
    </main>
);