import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateTouristZoneDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty()
    @IsString()
    location: string;
    
    @ApiProperty()
    @IsArray()
    @IsOptional()
    images: Express.Multer.File[];
}

export class UpdateTouristZoneDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    location?: string;
}
