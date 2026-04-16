import HeroVisual from '@/components/HeroVisual'
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react'

const CreatePlaylist = () => {
    const [errorMessage, setErrorMessage] = useState(null);

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

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get('token');

        if (urlToken) {
            sessionStorage.setItem('spotify_token', urlToken);
            window.history.replaceState({}, '', '/create-playlist');
        }

        const token = sessionStorage.getItem('spotify_token');

        fetch(import.meta.env.VITE_BACKEND_API + '/validate-session', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.status === 401) {
                window.location.href = '/error'
            }
        })
    }, [])

    return (
        <div className="min-h-screen bg-background">

            <nav className="fixed top-0 w-full z-50 glass">
                <div className="container flex items-center justify-between h-16">
                    <span className="text-xl font-bold tracking-tight">
                        <span className="text-foreground">Welcome, </span>
                        <span className="text-primary">{'user_name'}</span>
                    </span>
                    <Button size="sm" onClick={handleLogout}>Logout</Button>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 px-4">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                            Start Creating{" "}
                            <span className="text-gradient">Playlists</span>
                        </h1>
                        {/* insert input field */}
                    </div>
                    <HeroVisual />
                </div>

                <p>{errorMessage}</p>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-border/50">
                <div className="container flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                        <span className="text-primary font-semibold">Michaelle </span>Oliveira © 2026
                    </span>
                    <span>Powered by AI & Spotify</span>
                </div>
            </footer>
        </div>
    )
}

export default CreatePlaylist