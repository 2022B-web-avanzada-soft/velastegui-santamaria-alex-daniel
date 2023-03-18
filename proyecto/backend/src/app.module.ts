import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProductoEntity} from "./producto/producto.entity";
import {ProductoModule} from "./producto/producto.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './bdd/bdd.sqlite',
      entities: [
        ProductoEntity,
      ],
      synchronize: true,
      dropSchema: false,
    }),
    ProductoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
