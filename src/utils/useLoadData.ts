import { useCallback, useState } from "react"
import { toast } from "sonner";

interface Track {
    name: string;
    artist: string;
    album_name: string;
    album_cover: string;
    explicit: boolean;
}
interface Artist {
    name: string;
    image: string;
}
interface DashboardData {
    profile: {
        display_name: string;
        email: string;
        followers: number;
        icon: string;
    };
    tracks: {
        tracks: Track[];
    };
    artists: {
        artists: Artist[];
    };
}

type TimeRangeValue = 'short_term' | 'medium_term' | 'long_term';

export const useLoadData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<DashboardData | null>(null);
    const [timeRange, setTimeRange] = useState<TimeRangeValue>('medium_term');

    const loadData = useCallback(async (timeRange: TimeRangeValue) => {
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
                console.log(data);
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
    }, []);

    return { loadData, isLoading, data, setTimeRange, timeRange }
}