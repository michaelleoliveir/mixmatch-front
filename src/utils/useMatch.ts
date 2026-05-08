import { useEffect, useState } from "react";

export interface MatchTrack {
    name: string;
    artist: string;
    album: string;
    photo: string;
}

export interface MatchArtist {
    name: string;
    photo: string;
}

export interface MatchData {
    match_percent: number;
    owner_name: string;
    visitor_name: string;
    common_data: {
        tracks: MatchTrack[];
        artists: MatchArtist[];
    };
}

const mockData: MatchData = {
    match_percent: 85.5,
    owner_name: "Sofia Martins",
    visitor_name: "You",
    common_data: {
        artists: [
            { name: "Tame Impala", photo: "https://i.pravatar.cc/200?img=11" },
            { name: "The Weeknd", photo: "https://i.pravatar.cc/200?img=14" },
            { name: "Daft Punk", photo: "https://i.pravatar.cc/200?img=22" },
            { name: "Arctic Monkeys", photo: "https://i.pravatar.cc/200?img=33" },
            { name: "ODESZA", photo: "https://i.pravatar.cc/200?img=41" },
            { name: "FKA twigs", photo: "https://i.pravatar.cc/200?img=44" },
        ],
        tracks: [
            { name: "Borderline", artist: "Tame Impala", album: "The Slow Rush", photo: "https://picsum.photos/seed/t1/200" },
            { name: "Blinding Lights", artist: "The Weeknd", album: "After Hours", photo: "https://picsum.photos/seed/t2/200" },
            { name: "Get Lucky", artist: "Daft Punk", album: "Random Access Memories", photo: "https://picsum.photos/seed/t3/200" },
            { name: "Do I Wanna Know?", artist: "Arctic Monkeys", album: "AM", photo: "https://picsum.photos/seed/t4/200" },
            { name: "Say My Name", artist: "ODESZA", album: "A Moment Apart", photo: "https://picsum.photos/seed/t5/200" },
            { name: "Two Weeks", artist: "FKA twigs", album: "LP1", photo: "https://picsum.photos/seed/t6/200" },
        ],
    },
};

export const useMatch = () => {
    const [data, setData] = useState<MatchData | null>(null);
    const [loading, setLoading] = useState(true);
    const link = typeof window !== "undefined" ? window.location.href : "";

    useEffect(() => {
        const t = setTimeout(() => {
            setData(mockData);
            setLoading(false);
        }, 1200);
        return () => clearTimeout(t);
    }, []);

    return { data, loading, link };
};
