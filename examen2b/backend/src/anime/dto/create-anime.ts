import {IsBoolean, IsInt, IsNotEmpty, IsString} from "@nestjs/class-validator";

export class CreateAnimeDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsBoolean()
    isOnAir: boolean;
    @IsNotEmpty()
    @IsString()
    releaseDate: Date;
    @IsNotEmpty()
    @IsInt()
    capNumber: number;
}