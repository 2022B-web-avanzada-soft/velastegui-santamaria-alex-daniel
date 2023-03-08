import {AnimeInterface} from "@/interfaces/anime-interface";

export interface CharacterInterface {
    id: number;
    name: string;
    isMortal: boolean;
    birthDate: string;
    isMarried: boolean;
    anime?: AnimeInterface | number;
}