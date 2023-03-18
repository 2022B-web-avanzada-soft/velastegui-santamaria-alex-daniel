import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query} from "@nestjs/common";
import {validate} from "class-validator";
import {ProductoService} from "./producto.service";
import {ProductoUpdateDto} from "./dto/producto-update.dto";
import {ProductoCreateDto} from "./dto/producto-create.dto";

@Controller('producto')
export class ProductoController{
    constructor(
        private readonly productoService: ProductoService
    ) {
    }


    @Delete("/:id")
    @HttpCode(200)
    delete(
        @Param() params
    ){
        return this.productoService.delete(+params.id);
    }

    @Put("/:id")
    @HttpCode(200)
    async update(
        @Param() params, // {id:1}
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new ProductoUpdateDto();
        nuevoRegistro.nombre = bodyParams.nombre;
        nuevoRegistro.precio = bodyParams.precio;
        nuevoRegistro.cantidad = bodyParams.cantidad;
        nuevoRegistro.tieneIva = bodyParams.tieneIva;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.productoService.update(
            bodyParams,
            +params.id
        );
    }

    @Post("/nuevoProducto/") // POST /usuario
    @HttpCode(201)
    async create(
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new ProductoCreateDto();
        nuevoRegistro.nombre = bodyParams.nombre;
        nuevoRegistro.precio = bodyParams.precio;
        nuevoRegistro.cantidad = bodyParams.cantidad;
        nuevoRegistro.tieneIva = bodyParams.tieneIva;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.productoService.create(nuevoRegistro);
    }

    @Get("/")
    @HttpCode(200)
    async findAll() {
        return this.productoService.find({});
    }

}