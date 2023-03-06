import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Anime} from "./anime.entity";
import {CreateAnimeDto} from "./dto/create-anime";
import {UpdateAnimeDto} from "./dto/update-anime";

@Injectable()
export class AnimeService {
    constructor(
        @InjectRepository(Anime)
        private readonly _animeRepository: Repository<Anime>,
    ) {}

    findAll(): Promise<Anime[]> {
        return this._animeRepository.find({
            relations: ['characters']
        });
    }

    findOneById(id: number): Promise<Anime> {
        return this._animeRepository.findOne({
            where: {
                id: id
            },
            relations: ['characters']
        });
    }

    create(anime: CreateAnimeDto): Promise<Anime> {
        return this._animeRepository.save(anime);
    }

    update(id: number, anime: UpdateAnimeDto): Promise<Anime> {
        return this._animeRepository.save({
            ...anime, id
        });
    }
}