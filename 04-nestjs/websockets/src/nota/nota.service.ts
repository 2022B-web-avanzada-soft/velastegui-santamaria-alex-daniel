import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {Nota} from "./nota.entity";

@Injectable()
export class NotaService{
    constructor(
        @InjectDataSource()
        public readonly dataSource: DataSource,
    ) {}
    public notaRepository = this.dataSource.getRepository(Nota);
}