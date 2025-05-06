import { Module } from "@nestjs/common";
import { TouristZoneController } from "./tourist-zone.controller";
import { TouristZoneService } from "./tourist-zone.service";
import { PostgresService } from "src/configs";
import { FsHelper } from "src/helper";

@Module({
    controllers:[TouristZoneController],
    providers:[TouristZoneService,PostgresService,FsHelper]
})

export class TouristZoneModel{}