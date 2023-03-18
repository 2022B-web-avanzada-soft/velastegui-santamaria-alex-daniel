import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource, FindManyOptions} from "typeorm";
import {ProductoEntity} from "./producto.entity";
import {ProductoCreateDto} from "./dto/producto-create.dto";
import {ProductoUpdateDto} from "./dto/producto-update.dto";

@Injectable()
export class ProductoService{
    constructor(
        @InjectDataSource()
        public datasource: DataSource
    ) {   }
    public productoRepository = this.datasource.getRepository(ProductoEntity);

    find(opciones: FindManyOptions<ProductoEntity>) {
        return this.productoRepository.find(opciones)
    }

    create(datosCrear: ProductoCreateDto) {
        return this.productoRepository.save(datosCrear);
    }
    update(datosActualizar: ProductoUpdateDto, id: number) {
        return this.productoRepository.save(
            {...datosActualizar, id}
        );
    }
    delete(id: number) {
        return this.productoRepository.delete(id);
    }
}