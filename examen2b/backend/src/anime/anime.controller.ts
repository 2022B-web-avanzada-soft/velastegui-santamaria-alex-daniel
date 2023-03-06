import {BadRequestException, Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {AnimeService} from "./anime.service";
import {CreateAnimeDto} from "./dto/create-anime";
import {validate} from "@nestjs/class-validator";

@Controller('anime')
export class AnimeController {
    constructor(
        private readonly _animeService: AnimeService,
    ) {}

    @Get()
    @HttpCode(200)
    findAll() {
        return this._animeService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    findOneById(@Param('id', ParseIntPipe) id: number){
        return this._animeService.findOneById(id);
    }

    @Post()
    @HttpCode(201)
    async create(@Body() anime: any) {
        const newAnime = new CreateAnimeDto();
        newAnime.name = anime.name;
        newAnime.isOnAir = anime.isOnAir;
        newAnime.releaseDate = anime.releaseDate;
        newAnime.capNumber = anime.capNumber;
        const errors = await validate(newAnime);
        if (errors.length > 0) {
            console.error(errors);
            throw new BadRequestException({
                mensaje: 'Datos incorrectos'
            })
        }
        return this._animeService.create(newAnime);
    }

    @Put(':id')
    @HttpCode(200)
    async update(
        @Body() anime: any,
        @Param('id', ParseIntPipe) id: number
    ) {
        const modifiedAnime = new CreateAnimeDto();
        modifiedAnime.name = anime.name;
        modifiedAnime.isOnAir = anime.isOnAir;
        modifiedAnime.releaseDate = anime.releaseDate;
        modifiedAnime.capNumber = anime.capNumber;
        const errors = await validate(modifiedAnime);
        if (errors.length > 0) {
            console.error(errors);
            throw new BadRequestException({
                mensaje: 'Datos incorrectos'
            })
        }
        return this._animeService.update(id, modifiedAnime);
    }
}