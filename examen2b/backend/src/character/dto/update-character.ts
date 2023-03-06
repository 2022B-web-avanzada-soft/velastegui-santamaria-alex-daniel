import {IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString} from "@nestjs/class-validator";

export class UpdateCharacterDto{
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsBoolean()
    isMortal: boolean;
    @IsOptional()
    @IsString()
    birthDate: Date;
    @IsOptional()
    @IsBoolean()
    isMarried: boolean;
}