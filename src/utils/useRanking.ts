import { Ranking } from "@/types/ranking"
import { useCallback, useState } from "react"
import { toast } from "sonner";

export const useRanking = () => {
    const [ranking, setRanking] = useState<Ranking[]>([]);

    const rankingResponse = useCallback(async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API + '/match/ranking', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('spotify_token')}`
                }
            });

            console.log(response);

            if (response.ok) {
                const data = await response.json();
                setRanking(data.ranking)
            }
        } catch (error) {
            toast.error("Could not generate ranking", {
                description: "There was a problem connecting to Spotify. Try again.",
            });
        }
    }, []);

    return { ranking, rankingResponse }
}
