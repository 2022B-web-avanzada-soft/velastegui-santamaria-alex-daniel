import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EventosModule} from "./eventos/eventos.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Usuario} from "./usuario/usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";
import {NotaModule} from "./nota/nota.module";

@Module({
  imports: [
      EventosModule,
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: './bdd/bdd.sqlite',
        entities: [Usuario],
        synchronize: true,
        dropSchema: true,
      }),
      UsuarioModule,
      NotaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
