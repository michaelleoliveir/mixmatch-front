import HeroVisual from '@/components/HeroVisual'

const CreatePlaylist = () => {
    return (
        <div className="min-h-screen bg-background">

            <nav className="fixed top-0 w-full z-50 glass">
                <div className="container flex items-center justify-between h-16">
                    <span className="text-xl font-bold tracking-tight">
                        <span className="text-foreground">Welcome, </span>
                        <span className="text-primary">{'user_name'}</span>
                    </span>
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