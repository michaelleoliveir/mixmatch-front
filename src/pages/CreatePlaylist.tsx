import HeroVisual from '@/components/HeroVisual'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react'

const CreatePlaylist = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [icon, setIcon] = useState(null);
    const isGenerating = false;

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
            console.log(data)
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

    if (isLoading) {
        return <div className="min-h-screen bg-background" />;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
                <div className="container flex items-center justify-between h-20 px-4">

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-primary/50 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

                            <img
                                src={icon || 'https://github.com/identicons/jasonlong.png'}
                                alt="User Icon"
                                className="relative h-10 w-10 rounded-full object-cover border-2 border-primary/20 bg-secondary shadow-inner"
                            />
                        </div>

                        <span className="text-xl font-bold tracking-tight hidden sm:block">
                            <span className="text-muted-foreground font-medium">Welcome, </span>
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
            <section className="flex-grow min-h-[100vh] flex items-center justify-center px-4 py-24">
                <div className="container max-w-4xl mx-auto flex flex-col items-center text-center space-y-10">
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
                                    placeholder="Ex: A rainy morning with a cup of coffee..."
                                    className="h-14 px-6 rounded-2xl bg-secondary/30 border-border/50 focus:ring-primary text-base w-full"
                                />
                            </div>

                            <Button
                                size="lg"
                                className="h-14 px-8 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] min-w-[200px]"
                            >
                                {isGenerating ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                        Creating...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Generate <Sparkles className="h-5 w-5 text-primary-foreground" />
                                    </span>
                                )}
                            </Button>
                        </div>

                        {errorMessage && (
                            <p className="text-destructive text-sm font-medium animate-bounce">
                                {errorMessage}
                            </p>
                        )}
                    </div>
                </div>
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