import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Anime} from "../anime/anime.entity";

@Entity()
export class Character {
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
    isMortal: boolean;
    @Column({
        type: "date",
    })
    birthDate: Date;
    @Column({
        type: "boolean",
    })
    isMarried: boolean;
    @ManyToOne(
        type => Anime,
        anime => anime.characters,
    )
    anime: Anime;
}
