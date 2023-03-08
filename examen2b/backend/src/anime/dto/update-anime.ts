import {IsBoolean, IsInt, IsOptional, IsString} from "@nestjs/class-validator";

export class UpdateAnimeDto {
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsBoolean()
    isOnAir: boolean;
    @IsOptional()
    @IsString()
    releaseDate: Date;
    @IsOptional()
    @IsInt()
    capNumber: number;
}