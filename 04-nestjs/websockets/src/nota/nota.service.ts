import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource, FindManyOptions} from "typeorm";
import {Nota} from "./nota.entity";

@Injectable()
export class NotaService{
    constructor(
        @InjectDataSource()
        public readonly dataSource: DataSource,
    ) {}
    public notaRepository = this.dataSource.getRepository(Nota);

    find(opciones: FindManyOptions<Nota>) {
        return this.notaRepository.find(opciones)
    }
    findOneById(id: number) {
        return this.notaRepository.findOne({
            // select:{ },
            where: {
                id: id
            },
        })
    }
    create(datosCrear: any) {
        return this.notaRepository.save(datosCrear);
    }
    update(datosActualizar: any, id: number) {
        return this.notaRepository.save(
            {...datosActualizar, id}
        );
    }
    delete(id: number) {
        return this.notaRepository.delete(id);
    }
}