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
        name: "is_on_air",
    })
    isOnAir: boolean;
    @Column({
        type: "date",
        name: "release_date",
    })
    releaseDate: Date;
    @Column({
        type: "int",
        name: "cap_number",
    })
    capNumber: number;
    @OneToMany(
        type => Character,
        character => character.anime,
    )
    characters: Character[];
}