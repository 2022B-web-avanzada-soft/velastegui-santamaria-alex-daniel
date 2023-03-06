import {IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString} from "@nestjs/class-validator";

export class CreateCharacterDto{
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsBoolean()
    isMortal: boolean;
    @IsNotEmpty()
    @IsString()
    birthDate: Date;
    @IsNotEmpty()
    @IsBoolean()
    isMarried: boolean;
    @IsNotEmpty()
    @IsNumber()
    anime: number;
}