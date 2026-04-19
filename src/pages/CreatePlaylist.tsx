import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

const CreatePlaylist = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [icon, setIcon] = useState(null);
    const [mood, setMood] = useState('');
    const [previewData, setPreviewData] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        const storedToken = sessionStorage.getItem('spotify_token');

        if (urlToken) {
            sessionStorage.setItem('spotify_token', urlToken);
            window.history.replaceState({}, '', '/create-playlist');
            validateSession(urlToken);
            return;
        }

        if (!storedToken) {
            sessionStorage.setItem('auth_error', 'true');
            window.location.href = '/';
            return;
        }

        validateSession(storedToken)
    }, []);

    const validateSession = (token: string) => {
        fetch(import.meta.env.VITE_BACKEND_API + '/validate-session', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                setIsLoading(false);
                return res.json();
            }
        }).then((data) => {
            setUser(data.user);
            setIcon(data.icon);
        }).catch(() => {
            sessionStorage.removeItem('spotify_token')
            window.location.href = '/error'
        })
    }

    const handleLogout = async () => {
        const token = sessionStorage.getItem('spotify_token');

        try {
            await fetch(import.meta.env.VITE_BACKEND_API + '/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
        } catch (error) {
            setErrorMessage(error);
        } finally {
            sessionStorage.removeItem('spotify_token');
            window.location.href = '/';
        }
    }

    const handlePreview = async () => {
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
    }

    if (isLoading) {
        return <div className="min-h-screen bg-background" />;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
                <div className="container flex items-center justify-between h-16 px-4">

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-primary/50 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

                            <img
                                src={icon || 'https://github.com/identicons/jasonlong.png'}
                                alt="User Icon"
                                className="relative h-10 w-10 rounded-full object-cover border-2 border-primary/20 bg-secondary shadow-inner"
                            />
                        </div>

                        <span className="text-lg font-bold tracking-tight hidden sm:block">
                            <span className="text-muted-foreground">Welcome, </span>
                            <span className="text-primary">{user || 'Explorer'}</span>
                        </span>
                    </div>

                    <Button
                        size="sm"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex-grow min-h-[100vh] flex flex-col items-center justify-center px-4 py-24">
                <div className="container mt-16 max-w-4xl mx-auto flex flex-col items-center text-center space-y-10">
                    <div className="flex flex-col items-center text-center space-y-8">
                        <div className="flex flex-col items-center space-y-4">
                            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                Start Creating{" "}
                                <span className="text-gradient">Playlists</span>
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-[500px]">
                                Describe how you're feeling or what you're doing, and let our AI
                                curate the perfect soundtrack for your moment.
                            </p>
                        </div>

                        {/* Input Field Area */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-[90%]">
                            <div className="relative flex-grow">
                                <Input
                                    value={mood}
                                    onChange={(e) => {
                                        setMood(e.target.value)

                                        if (errorMessage) setErrorMessage(null);
                                    }}
                                    placeholder="Ex: A rainy morning with a cup of coffee..."
                                    className={`
                                            h-14 px-6 rounded-2xl bg-secondary/30 text-base w-full transition-all outline-none
                                            ${errorMessage
                                            ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400'
                                            : 'border-border/50 focus:border-green-500 focus:ring-2 focus:ring-green-500'
                                        }
`}
                                />
                                <p className='text-start text-sm mt-2 ml-2 text-red-400'>{errorMessage}</p>
                            </div>

                            <Button
                                onClick={handlePreview}
                                disabled={isGenerating}
                                size="lg"
                                className={`
                                            h-14 px-8 rounded-2xl font-bold text-lg transition-all min-w-[200px] relative overflow-hidden
                                        ${isGenerating
                                        ? 'cursor-not-allowed grayscale'
                                        : 'bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]'
                                    }
                                `}
                            >
                                {isGenerating && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                    />
                                )}

                                {isGenerating ? (
                                    <span className="flex items-center gap-3">
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                                        <span className="animate-pulse">Generating...</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Generate <Sparkles className="h-5 w-5" />
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {previewData && (
                        <motion.div
                            key={previewData.playlist_name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="mt-16 space-y-6"
                        >
                            <div className="flex justify-between items-end">
                                <h2 className="text-2xl font-bold text-white">
                                    {previewData.playlist_name}
                                </h2>
                                <span className="text-sm text-gray-400">
                                    {previewData.tracks.length} músicas
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {previewData.tracks.map((track, index) => (
                                    <motion.div
                                        key={track.uri}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }} // Efeito cascata
                                        className="flex items-center gap-4 bg-secondary/20 p-3 rounded-2xl border border-white/5 hover:bg-secondary/40 transition-colors group"
                                    >
                                        <div className="relative overflow-hidden rounded-lg w-14 h-14 shrink-0">
                                            <img
                                                src={track.album_image}
                                                alt={track.name}
                                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-white truncate">{track.name}</p>
                                            <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Botão de Confirmação Final */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-green-500 text-black font-black rounded-2xl shadow-lg shadow-green-500/20 mt-4"
                            >
                                ADICIONAR AO SPOTIFY
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-border/50">
                <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <span>
                        <span className="text-primary font-semibold">Michaelle </span>Oliveira © 2026
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span>Connected to Spotify API</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default CreatePlaylist