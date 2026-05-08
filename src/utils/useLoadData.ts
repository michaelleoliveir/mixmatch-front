import { DashboardData } from "@/types/dashboard";
import { useCallback, useState } from "react"
import { toast } from "sonner";

type TimeRangeValue = 'short_term' | 'medium_term' | 'long_term';

export const useLoadData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<DashboardData | null>(null);
    const [timeRange, setTimeRange] = useState<TimeRangeValue>('medium_term');

    const loadData = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API + '/dashboard?time_range=' + timeRange, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('spotify_token')}`
                }
            })

            if (response.ok) {
                const data = await response.json() as DashboardData;
                setData(data);
                setIsLoading(false);
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Could not load data", {
                description: "There was a problem connecting to Spotify. Try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }, [timeRange]);

    return { loadData, isLoading, data, setTimeRange, timeRange }
}