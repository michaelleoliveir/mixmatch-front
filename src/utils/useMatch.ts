import { MatchData } from "@/types/match";
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const useMatch = () => {
    const navigate = useNavigate();
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

            const matching = await response.json();

            if (response.ok) {
                setData(matching);
            } else {
                if (response.status === 400) {
                    setData(null);
                    navigate('/dashboard');
                    toast.error("Could not load data", {
                        description: matching.message || 'Could not compare profiles. Try again later.',
                    });

                    return;
                }

                toast.error("Error", {
                    description: matching.message || 'Could not compare profiles. Try again later.',
                });
            }
        } catch (error) {
            toast.error("Network Error", {
                description: "Could not connect to the server. Please try again.",
            });
        } finally {
            setIsLoading(false)
        }
    }, [matchCode]);

    useEffect(() => {
        if (matchCode) {
            fetchMatch();
        }

        matchLink();
    }, [matchCode, fetchMatch, matchLink]);

    return { matchLink, link, data, loading };
}
