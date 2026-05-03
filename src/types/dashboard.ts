import { Artist } from "./artist";
import { Track } from "./track";

export interface DashboardData {
    profile: {
        display_name: string;
        email: string;
        followers: number;
        icon: string;
    };
    tracks: {
        tracks: Track[];
    };
    artists: {
        artists: Artist[];
    };
}