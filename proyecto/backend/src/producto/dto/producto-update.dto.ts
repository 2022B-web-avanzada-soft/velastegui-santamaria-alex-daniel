import {IsString, IsInt, IsNumber, IsBoolean, IsOptional} from "class-validator";

export class ProductoUpdateDto {
    @IsOptional()
    @IsString()
    nombre: string;

    @IsOptional()
    @IsInt()
    cantidad: number;

    @IsOptional()
    @IsNumber()
    precio: number;

    @IsOptional()
    @IsBoolean()
    tieneIva: boolean;
}