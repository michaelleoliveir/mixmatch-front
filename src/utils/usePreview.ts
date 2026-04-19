import { useCallback, useState } from "react"

export const usePreview = () =>{
    const [errorMessage, setErrorMessage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(null);
    const [previewData, setPreviewData] = useState(null);

    const getPreview = useCallback(async(mood: string) => {
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
                setErrorMessage('An error occurred while generating the playlist preview. Please, try again later.');
            }

            setPreviewData(data);
        } catch (error) {
            setErrorMessage('An error occurred while generating the playlist preview. Please, try again later.');
        } finally {
            setIsGenerating(false);
        }
    }, []);

    return { previewData, isGenerating, errorMessage, setErrorMessage, getPreview };
}