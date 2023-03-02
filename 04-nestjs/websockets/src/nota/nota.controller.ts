import {Controller} from "@nestjs/common";
import {NotaService} from "./nota.service";

@Controller('nota')
export class NotaController {
    constructor(
        private readonly _notaService: NotaService
    ) {
    }
}