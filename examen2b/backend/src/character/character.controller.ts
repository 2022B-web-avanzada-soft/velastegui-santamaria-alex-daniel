import {BadRequestException, Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {CharacterService} from "./character.service";
import {CreateCharacterDto} from "./dto/create-character";
import {validate} from "@nestjs/class-validator";
import {UpdateCharacterDto} from "./dto/update-character";

@Controller('character')
export class CharacterController {
    constructor(private readonly characterService: CharacterService) {}

    @Get()
    @HttpCode(200)
    async findAll() {
        return this.characterService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.characterService.findById(id);
    }

    @Post()
    @HttpCode(201)
    async create(
        @Body() character: any
    ) {
        const newCharacter = new CreateCharacterDto();
        newCharacter.name = character.name;
        newCharacter.isMortal = character.isMortal;
        newCharacter.isMarried = character.isMarried;
        newCharacter.birthDate = character.birthDate;
        newCharacter.anime = character.anime;
        const errors = await validate(newCharacter);
        if (errors.length > 0) {
            console.error(errors);
            throw new BadRequestException({
                mensaje: 'Datos incorrectos'
            })
        }
        return this.characterService.create(character);
    }

    @Put(':id')
    @HttpCode(200)
    async update(
        @Body() character: any,
        @Param('id', ParseIntPipe) id: number
    ) {
        const modifiedCharacter = new UpdateCharacterDto();
        modifiedCharacter.name = character.name;
        modifiedCharacter.isMortal = character.isMortal;
        modifiedCharacter.isMarried = character.isMarried;
        modifiedCharacter.birthDate = character.birthDate;
        const errors = await validate(modifiedCharacter);
        if (errors.length > 0) {
            console.error(errors);
            throw new BadRequestException({
                mensaje: 'Datos incorrectos'
            })
        }
        return this.characterService.update(id, character);
    }
}