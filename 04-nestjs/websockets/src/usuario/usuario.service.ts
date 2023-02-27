import {Injectable} from "@nestjs/common";
import {Usuario} from "./usuario.entity";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource, FindManyOptions} from "typeorm";
import {UsuarioCreateDto} from "./dto/usuario-create";
import {UsuarioUpdateDto} from "./dto/usuario-update";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectDataSource()
        public readonly dataSource: DataSource,
    ) {}
    public usuarioRepository = this.dataSource.getRepository(Usuario);

    find(opciones: FindManyOptions<Usuario>){
        return this.usuarioRepository.find(opciones);
    }

    findOneById(id: number){
        return this.usuarioRepository.findOne({
            where: {
                id: id
            }
        });
    }

    create(datosCrear: UsuarioCreateDto){
        return this.usuarioRepository.save(datosCrear);
    }

    update(id: number, datosActualizar: UsuarioUpdateDto){
        return this.usuarioRepository.save({
            ...datosActualizar, id
        })
    }

    delete(id: number){
        return this.usuarioRepository.delete(id);
    }
}