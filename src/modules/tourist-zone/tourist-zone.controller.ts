import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { TouristZoneService } from "./tourist-zone.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CreateTouristZoneDto, UpdateTouristZoneDto } from "./dtos";
import { CheckFileSizePipe } from "src/pipe";

@Controller('tourist-zones')
export class TouristZoneController {
    constructor(private readonly touristZoneService: TouristZoneService) { }

    @Get()
    async getAll() {
        return await this.touristZoneService.getAllTuristZones();
    }

    @Post()
    @UseInterceptors(FilesInterceptor("images"))
    async create(@Body() payload: CreateTouristZoneDto, @UploadedFiles() images: Express.Multer.File[]
    ) {
        console.log(images);
        return await this.touristZoneService.create({ ...payload, images });
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateTouristZoneDto) {
        return await this.touristZoneService.update(id, payload);
    }

    @Put('update/:id')
    @UseInterceptors(FilesInterceptor("images"))
    async updateImage(@Param('id', ParseIntPipe) id: number, @UploadedFiles() images: Express.Multer.File[]) {
        console.log(images);
        return await this.touristZoneService.updateImage(id, images);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.touristZoneService.delete(id);
    }
}
