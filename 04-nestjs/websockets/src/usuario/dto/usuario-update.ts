import {IsIn, IsOptional, IsString} from "class-validator";

export class UsuarioUpdateDto {
    @IsOptional()
    @IsString()
    nombres: string;
    @IsOptional()
    @IsString()
    apellidos: string;
    @IsOptional()
    @IsIn(['U', 'A'])
    rol: string;
}