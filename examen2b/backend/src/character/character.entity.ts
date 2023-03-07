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
        name: "birth_date",
    })
    birthDate: Date;
    @Column({
        type: "boolean",
        name: "is_married",
    })
    isMarried: boolean;
    @ManyToOne(
        () => Anime,
        anime => anime.characters,
        {
            onDelete: "SET NULL",
        }
    )
    @JoinColumn({
        name: "anime_id",
    })
    anime: Anime;
}
