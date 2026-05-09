import { MatchData } from "@/types/match";
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const useMatch = () => {
    const [link, setLink] = useState<string | null>(null);
    const { matchCode } = useParams<{ matchCode: string }>();
    const [data, setData] = useState<MatchData | null>(null);
    const [loading, setIsLoading] = useState(false)

    const matchLink = useCallback(async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API + '/match', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('spotify_token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setLink(data.shared_link);
            }
        } catch (error) {
            toast.error("Could not generate link", {
                description: "There was a problem connecting to Spotify. Try again.",
            });
        }
    }, []);

    const fetchMatch = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API + `/match/${matchCode}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('spotify_token')}`
                }
            });

            if (response.ok) {
                const matching = await response.json();
                setData(matching);
            }
        } catch (error) {
            toast.error("Could not load data", {
                description: "There was a problem connecting to Spotify. Try again.",
            });
        } finally {
            setIsLoading(false)
        }
    }, [matchCode]);

    useEffect(() => {
        if(matchCode) {
            fetchMatch();
        }

        matchLink();
    }, [matchCode, fetchMatch, matchLink]);

    return { matchLink, link, data, loading };
}
