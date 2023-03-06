import {Injectable} from "@nestjs/common";
import {Character} from "./character.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateCharacterDto} from "./dto/create-character";
import {UpdateCharacterDto} from "./dto/update-character";

@Injectable()
export class CharacterService {
    constructor(
        @InjectRepository(Character)
        private readonly _characterRepository: Repository<Character>,
    ) {}

    findAll(): Promise<Character[]> {
        return this._characterRepository.find({
            relations: ['anime']
        });
    }

    findById(id: number): Promise<Character> {
        return this._characterRepository.findOne({
            where: {
                id: id
            },
            relations: ['anime']
        });
    }

    create(character: any): Promise<any> {
        return this._characterRepository.save(character);
    }

    update(id: number, character: UpdateCharacterDto): Promise<Character> {
        return this._characterRepository.save({
            ...character, id
        })
    }
}