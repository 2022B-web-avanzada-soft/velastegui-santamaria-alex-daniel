import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./dto/usuario-create";
import {validate} from "class-validator";
import {UsuarioUpdateDto} from "./dto/usuario-update";

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
}