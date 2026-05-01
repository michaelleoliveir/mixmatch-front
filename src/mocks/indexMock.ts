import { Brain, Sparkles, Music, Cpu, Headphones, LogIn, MessageSquare } from "lucide-react";

export const features = [
    {
        icon: Brain,
        title: "AI Mood Detection",
        desc: "Describe your mood, from 'calm morning' to 'high-energy gym session', and our AI understands.",
    },
    {
        icon: Sparkles,
        title: "Personalized Curation",
        desc: "We blend your favorite tracks with new discoveries that match your vibe perfectly.",
    },
    {
        icon: Music,
        title: "Direct Spotify Integration",
        desc: "Playlists are created directly in your account in seconds. No friction, just music.",
    },
];

export const steps = [
    { icon: LogIn, label: "Log in with your Spotify account" },
    { icon: MessageSquare, label: "Describe your current mood or activity" },
    { icon: Cpu, label: "Our AI analyzes and curates the perfect tracks" },
    { icon: Headphones, label: "The playlist appears instantly in your Spotify app" },
];

export const previewTracks = [
    { name: "Midnight City", artist: "M83", explicit: false },
    { name: "Blinding Lights", artist: "The Weeknd", explicit: false },
    { name: "HUMBLE.", artist: "Kendrick Lamar", explicit: true },
    { name: "Redbone", artist: "Childish Gambino", explicit: true },
    { name: "Sunflower", artist: "Post Malone, Swae Lee", explicit: false },
];

export const previewArtists = [
    { name: "Tame Impala", initials: "TI" },
    { name: "Daft Punk", initials: "DP" },
    { name: "Arctic Monkeys", initials: "AM" },
    { name: "Frank Ocean", initials: "FO" },
];

export const promptExamples = [
    "Rainy day jazz vibe",
    "Late-night coding focus",
    "Sunday morning acoustic",
    "High-energy gym session",
];