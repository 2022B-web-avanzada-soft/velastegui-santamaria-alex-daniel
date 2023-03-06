import {Body, Controller, Get, HttpCode, Post} from "@nestjs/common";
import {NotaService} from "./nota.service";

@Controller('nota')
export class NotaController {
    constructor(
        private readonly _notaService: NotaService
    ) {
    }

    @Post()
    @HttpCode(201)
    async create(
        @Body() datosCrear: any
    ) {
        return await this._notaService.create(datosCrear);
    }

    @Get()
    @HttpCode(200)
    async findAll() {
        return await this._notaService.find({});
    }
}