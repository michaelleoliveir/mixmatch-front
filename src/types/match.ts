export interface MatchData {
    match_percent: number;
    owner_name: string;
    visitor_name: string;
    tracks_match: Array<{
        name: string;
        photo: string;
        artist: string;
        album: string;
    }>;
    artists_match: Array<{
        name: string;
        photo: string;
    }>;
}