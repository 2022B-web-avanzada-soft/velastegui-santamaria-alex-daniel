export interface AnimeInterface {
    id:number,
    name: string;
    isOnAir: boolean;
    releaseDate: string;
    capNumber: number;
    characters?: string[];
}