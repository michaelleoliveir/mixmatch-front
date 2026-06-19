export interface RankingDetails {
    owner: {
        name: string,
        icon: string
    },
    visitor: {
        name: string,
        icon: string
    },
    score: number,
    date: string,
    tracks_match:
    {
        name: string,
        album: string,
        photo: string,
        artist_name: string
    }[] | null,
    artists_match:
    {
        name: string,
        photo: string
    }[] | null
}