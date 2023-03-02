import {Module} from "@nestjs/common";
import {NotaController} from "./nota.controller";
import {NotaService} from "./nota.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Nota} from "./nota.entity";

@Module({
    controllers: [NotaController],
    providers: [NotaService],
    exports: [NotaService],
    imports: [TypeOrmModule.forFeature([Nota])]
})
export class NotaModule{

}