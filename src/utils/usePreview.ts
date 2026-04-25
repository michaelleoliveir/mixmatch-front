import { useCallback, useState } from "react"
import { toast } from "sonner";

export const usePreview = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [previewData, setPreviewData] = useState(null);

    const clearPreview = useCallback(() => {
        setPreviewData(null);
        setErrorMessage(null)
    }, [])

    const getPreview = useCallback(async (mood: string) => {
        if (!mood) {
            setErrorMessage('Please, enter a mood to generate a playlist');
            return;
        }

        setErrorMessage(null);
        setIsGenerating(true);

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API + '/playlist/preview?mood=' + mood, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('spotify_token')}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                const message = 'An unexpected error occurred. Try again later.';

                toast.error("Recommendation Error", { description: message });

                setPreviewData(null);
                return;
            }

            setPreviewData(data);
        } catch (error) {
            const genericError = 'Server connection failed. Please try again.';
            toast.error("Connection Error", { description: genericError });
        } finally {
            setIsGenerating(false);
        }
    }, []);

    return { previewData, isGenerating, errorMessage, setErrorMessage, getPreview, clearPreview };
}