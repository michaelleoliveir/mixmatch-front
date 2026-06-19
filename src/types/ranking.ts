export interface Ranking {
    id: string,
    user: {
        name: string,
        icon: string
    },
    score: number,
    registered_at: Date
}