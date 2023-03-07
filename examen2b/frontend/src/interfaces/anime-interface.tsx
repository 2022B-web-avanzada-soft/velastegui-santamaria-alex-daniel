import {CharacterInterface} from "@/interfaces/character-interface";

export interface AnimeInterface {
    id:number,
    name: string;
    isOnAir: boolean;
    releaseDate: string;
    capNumber: number;
    characters?: CharacterInterface[];
}