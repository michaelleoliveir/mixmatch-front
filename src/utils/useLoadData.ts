import { useCallback, useState } from "react"
import { toast } from "sonner";

export const useLoadData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null)

    const loadData = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API + '/dashboard', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('spotify_token')}`
                }
            })

            if (response.ok) {
                const data = await response.json();
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

    return { loadData, isLoading, data }
}