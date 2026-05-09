import { Music2 } from "lucide-react";

export const EmptyState = ({ message }: { message: string }) => (
    <div className="rounded-2xl glass border border-white/10 p-10 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Music2 className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-lg font-bold mb-1">No matches yet</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
    </div>
);