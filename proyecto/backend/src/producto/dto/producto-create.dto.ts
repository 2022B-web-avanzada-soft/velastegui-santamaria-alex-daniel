import {IsNotEmpty, IsString, IsInt, IsNumber, IsBoolean} from "class-validator";

export class ProductoCreateDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsInt()
    cantidad: number;

    @IsNotEmpty()
    @IsNumber()
    precio: number;

    @IsNotEmpty()
    @IsBoolean()
    tieneIva: boolean;
}
