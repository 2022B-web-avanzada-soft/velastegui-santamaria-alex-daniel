import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
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
        name: "is_mortal",
    })
    isMortal: boolean;
    @Column({
        type: "date",
    })
    birthDate: Date;
    @Column({
        type: "boolean",
        name: "is_married",
    })
    isMarried: boolean;
    @ManyToOne(
        type => Anime,
        anime => anime.characters,
    )
    @JoinColumn({
        name: "anime_id",
    })
    anime: Anime;
}
