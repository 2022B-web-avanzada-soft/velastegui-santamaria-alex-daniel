import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Character} from "./character/character.entity";
import {Anime} from "./anime/anime.entity";
import {AnimeModule} from "./anime/anime.module";
import {CharacterModule} from "./character/character.module";

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './BD/anime_bd.sqlite',
      entities: [Character, Anime],
      synchronize: true,
      dropSchema: false,
    }),
    CharacterModule,
    AnimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
