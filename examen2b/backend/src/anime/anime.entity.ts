import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Character} from "../character/character.entity";

@Entity()
export class Anime {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        length: 50,
        type: "varchar",
    })
    name: string;
    @Column({
        type: "boolean",
    })
    isOnAir: boolean;
    @Column({
        type: "date",
    })
    releaseDate: Date;
    @Column({
        type: "int",
    })
    capNumber: number;
    @OneToMany(
        type => Character,
        character => character.anime,
    )
    characters: Character[];
}