import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, RefreshCw, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/utils/useAuth';
import { usePreview } from '@/utils/usePreview';
import { useCreatePlaylist } from '@/utils/useCreatePlaylist';

const CreatePlaylist = () => {
    const [mood, setMood] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const { user, icon, handleLogout, isAuthLoading } = useAuth();
    const { errorMessage, setErrorMessage, isGenerating, previewData, getPreview, clearPreview } = usePreview();
    const { createPlaylist, isAdding } = useCreatePlaylist();

    const handlePreview = () => {
        getPreview(mood)
    }

    const handleCreatePlaylist = () => {
        if (previewData) {
            const uris = previewData.tracks.map((t: { uri: string; }) => t.uri);
            createPlaylist(previewData.playlist_name, uris);
            setIsSaved(true);
        }
    }

    const handleReset = () => {
        setIsSaved(false);
        clearPreview();
        setMood('');
    }

    if (isAuthLoading) {
        return <div className="min-h-screen bg-background" />;
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handlePreview();
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <nav className="fixed top-0 w-full z-50 py-2 backdrop-blur-md bg-background/70 border-b border-border/40">
                <div className="container flex items-center justify-between h-16 px-6">

                    <div className="flex items-center gap-3 group cursor-default">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>

                            <img
                                src={icon || 'https://github.com/identicons/jasonlong.png'}
                                alt="User Icon"
                                className="relative h-10 w-10 rounded-full object-cover border-[1.5px] border-primary/30 ring-2 ring-background ring-offset-1 transition-transform duration-300 group-hover:scale-105"
                            />

                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500"></span>
                        </div>

                        <div className="flex flex-col leading-none hidden sm:flex">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                                Welcome back
                            </span>
                            <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:from-primary group-hover:to-purple-500 transition-all duration-300">
                                {user || 'Explorer'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 h-4 w-4" /> 
                            Logout
                        </Button>
                    </div>

                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex-grow min-h-[100vh] flex flex-col items-center justify-center px-4 py-24">
                <div className="container mt-20 max-w-4xl mx-auto flex flex-col items-center text-center space-y-10">
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
                                    onKeyDown={handleKeyDown}
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
                            className="mt-24 space-y-6 w-full max-w-5xl mx-auto px-4"
                        >
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                <h2 className="text-2xl font-bold text-white tracking-tight">
                                    {previewData.playlist_name}
                                </h2>
                                <span className="text-base text-gray-400 font-medium hidden md:block">
                                    {previewData.tracks.length} songs
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {previewData.tracks.map((track, index) => (
                                    <motion.div
                                        key={track.uri}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center gap-4 bg-white/5 p-3 md:p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all duration-300 group"
                                    >
                                        <div className="relative overflow-hidden rounded-lg w-14 md:w-16 h-14 md:h-16 shrink-0 shadow-2xl">
                                            <img
                                                src={track.album_image}
                                                alt={track.name}
                                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-white text-base truncate group-hover:text-[#1DB954] transition-colors">
                                                {track.name}
                                            </p>
                                            <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex justify-center mt-12 w-full">
                                {isSaved ? (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={handleReset}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-2 px-10 py-5 bg-white text-black font-black text-base uppercase tracking-widest rounded-full shadow-xl transition-all"
                                    >
                                        Generate another one
                                        <RefreshCw className="w-5 h-5" />
                                    </motion.button>
                                ) : (
                                    <div className='flex flex-row gap-4 items-center'>
                                        <motion.button
                                            onClick={handleReset}
                                            whileHover={{ scale: 1.1, rotate: -10 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-300 group"
                                            title="Reset Playlist"
                                        >
                                            <RefreshCw
                                                className="w-6 h-6 text-muted-foreground group-hover:text-white transition-colors duration-300"
                                            />
                                        </motion.button>

                                        <motion.button
                                            onClick={handleCreatePlaylist}
                                            disabled={isAdding || !previewData}
                                            whileHover={!isAdding ? { scale: 1.02, filter: "brightness(1.1)" } : {}}
                                            whileTap={!isAdding ? { scale: 0.98 } : {}}
                                            className={`
                relative overflow-hidden
                w-full md:w-fit md:min-w-[300px] flex justify-center items-center px-10 py-5 
                text-black font-black text-base uppercase tracking-widest
                rounded-full transition-all duration-300
                ${isAdding
                                                    ? 'bg-gray-500 cursor-not-allowed'
                                                    : 'bg-[#1DB954] shadow-[0_15px_35px_-10px_rgba(29,185,84,0.4)]'
                                                }
            `}
                                        >

                                            {isAdding && (
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                    animate={{ x: ['-100%', '100%'] }}
                                                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                                                />
                                            )}

                                            <span className="flex items-center gap-3 relative z-10">
                                                {isAdding ? (
                                                    <>
                                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                                                        <span>Adding to library...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        Add to Library
                                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                                                        </svg>
                                                    </>
                                                )}
                                            </span>
                                        </motion.button>
                                    </div>
                                )}
                            </div>
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