import { Ranking } from "@/types/ranking"
import { RankingDetails } from "@/types/rankingDetails";
import { useCallback, useState } from "react"
import { toast } from "sonner";

export const useRanking = () => {
    const [ranking, setRanking] = useState<Ranking[]>([]);
    const [rankingDetails, setRankingDetails] = useState<RankingDetails>(null);
    const [loading, setLoading] = useState(false);

    const rankingResponse = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API + '/match/ranking', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('spotify_token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setRanking(data.ranking)
            }
        } catch (error) {
            toast.error("Could not generate ranking", {
                description: "There was a problem connecting to Spotify. Try again.",
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const rankingDetailResponse = useCallback(async (id: string) => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API + `/match/ranking/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('spotify_token')}`
                }
            });

            if(response.ok) {
                const data = await response.json();
                setRankingDetails(data)
            }
        } catch (error) {
            toast.error("Could not generate ranking", {
                description: "There was a problem connecting to Spotify. Try again.",
            });
        }
    }, [])

    return { ranking, rankingResponse, rankingDetailResponse, rankingDetails, loading }
}
