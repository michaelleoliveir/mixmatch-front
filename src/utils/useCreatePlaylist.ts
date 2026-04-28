import { useCallback, useState } from "react"
import { toast } from "sonner";

export const useCreatePlaylist = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [url, setUrl] = useState(null);

    const createPlaylist = useCallback(async (playlistName: string, uris: string[]) => {
        setIsAdding(true);

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API + '/playlist/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('spotify_token')}`
                },
                body: JSON.stringify({
                    'playlist_name': playlistName,
                    'uris': uris
                })
            });

            if (response.ok) {
                const data = await response.json();
                setUrl(data.playlist_url);
                toast.success("Playlist saved!", {
                    description: `"${playlistName}" is now in your Spotify library.`,
                });
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Could not save playlist", {
                description: "There was a problem connecting to Spotify. Try again.",
            });
        } finally {
            setIsAdding(false);
        }
    }, []);

    return { createPlaylist, isAdding, url }
}