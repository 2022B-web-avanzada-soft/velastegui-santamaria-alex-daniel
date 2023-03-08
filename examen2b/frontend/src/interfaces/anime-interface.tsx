import {CharacterInterface} from "@/interfaces/character-interface";

export interface AnimeInterface {
    id:number,
    name: string;
    isOnAir: boolean;
    releaseDate: Date;
    capNumber: number;
    characters?: CharacterInterface[];
}