import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, RefreshCw, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/utils/useAuth';
import { usePreview } from '@/utils/usePreview';
import { useCreatePlaylist } from '@/utils/useCreatePlaylist';
import DashboardSidebar from '@/components/DashboardSidebar';

const CreatePlaylist = () => {
    const [mood, setMood] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const { isAuthLoading } = useAuth();
    const { errorMessage, setErrorMessage, isGenerating, previewData, getPreview, clearPreview } = usePreview();
    const { createPlaylist, isAdding, url } = useCreatePlaylist();

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

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        show: (i: number = 0) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
        }),
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <DashboardSidebar />

            <main className='md:ml-64 px-6 md:px-10 py-10 pb-28 md:pb-10 max-w-full'>
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-14"
                >
                    <section className="flex-grow min-h-[84vh] flex flex-col items-center justify-center">
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
                                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                                <motion.button
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    onClick={() => window.open(url, '_blank')}
                                                    whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex items-center gap-3 px-10 py-5 bg-[#1DB954] text-black font-black text-base uppercase tracking-widest rounded-full shadow-[0_15px_35px_-10px_rgba(29,185,84,0.4)] transition-all"
                                                >
                                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.5 17.33c-.22.36-.68.47-1.05.25-2.81-1.73-6.35-2.12-10.51-1.17-.4.1-.82-.14-.92-.54-.1-.4.15-.82.55-.92 4.54-1.04 8.44-.6 11.63 1.35.37.23.48.69.3 1.03zm1.45-3.26c-.28.45-.87.59-1.32.31-3.22-1.98-8.13-2.55-11.94-1.39-.5.15-1.04-.13-1.19-.64-.15-.5.13-1.04.64-1.19 4.35-1.32 9.75-.68 13.5 1.62.45.28.6.87.31 1.3zm.14-3.41c-3.86-2.29-10.23-2.5-13.97-1.37-.6.18-1.23-.17-1.41-.77-.18-.6.17-1.23.77-1.41 4.29-1.3 11.33-1.04 15.8 1.61.54.32.72 1.03.4 1.57-.32.54-1.03.72-1.59.4z" />
                                                    </svg>
                                                    Open in Spotify
                                                </motion.button>
                                                <motion.button
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    onClick={handleReset}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="flex items-center gap-2 px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-black text-base uppercase tracking-widest rounded-full backdrop-blur-md transition-all border border-white/10"
                                                >
                                                    Generate another one
                                                    <RefreshCw className="w-5 h-5" />
                                                </motion.button>
                                            </div>
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
                </motion.section>
            </main>
        </div>
    )
}

export default CreatePlaylist