import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./dto/usuario-create";
import {validate} from "class-validator";
import {UsuarioUpdateDto} from "./dto/usuario-update";
import {FindManyOptions, FindOptionsWhere, Like} from "typeorm";
import {Usuario} from "./usuario.entity";

@Controller('usuario')
export class UsuarioController{
    constructor(
        private readonly _usuarioService: UsuarioService,
    ) {}

    @Get("/:id")
    @HttpCode(200)
    findOneById(
        @Param() param: any
    ) {
        return this._usuarioService.findOneById(+param.id);
    }

    @Delete("/:id")
    @HttpCode(200)
    delete(
        @Param() param: any
    ) {
        return this._usuarioService.delete(+param.id);
    }

    @Post("/")
    @HttpCode(201)
    async create(
        @Body() body: any
    ) {
        const nuevoRegistro = new UsuarioCreateDto();
        nuevoRegistro.nombres = body.nombres;
        nuevoRegistro.apellidos = body.apellidos;
        nuevoRegistro.rol = body.rol;
        const errores = await validate(
            nuevoRegistro
        )
        if(errores.length > 0){
            console.error(errores);
            throw new BadRequestException({
                mensaje: 'Datos incorrectos'
            })
        }
        return this._usuarioService.create(nuevoRegistro);
    }

    @Put("/:id")
    @HttpCode(200)
    async update(
        @Param() param: any,
        @Body() body: any
    ) {
        const nuevoRegistro = new UsuarioUpdateDto();
        nuevoRegistro.nombres = body.nombre;
        nuevoRegistro.apellidos = body.apellido;
        nuevoRegistro.rol = body.rol;
        const errores = await validate(
            nuevoRegistro
        )
        if(errores.length > 0){
            console.error(errores);
            throw new BadRequestException({
                mensaje: 'Datos incorrectos'
            })
        }
        return this._usuarioService.update(+param.id, nuevoRegistro);
    }

    @Get("/")
    @HttpCode(200)
    find(
        @Query() query: any
    ){
        const consulta: FindManyOptions<Usuario> = {
            skip: query.skip ? +query.skip : 0,
            take: query.take ? +query.take : 10,
        };
        const consultaWhere = [] as FindOptionsWhere<Usuario>[]

        if(query.nombres){
            consultaWhere.push({
                nombres: Like(`%${query.nombres}%`),
                rol: query.rol ? query.rol: undefined
            })
        }
        if(query.apellidos){
            consultaWhere.push({
                apellidos: Like(`%${query.apellidos}%`),
                rol: query.rol ? query.rol: undefined
            })
        }
        if(consultaWhere.length > 0){
            consulta.where = consultaWhere;
        }
        return this._usuarioService.find(consulta);
    }
}