import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateTouristZoneDto {
    @IsString()
    name: string;

    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsString()
    location: string;
    
    @IsArray()
    @IsOptional()
    images: Express.Multer.File[];
}

export class UpdateTouristZoneDto {
    @IsOptional()
    @IsString()
    name?: string;

    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsOptional()
    @IsString()
    location?: string;
}
