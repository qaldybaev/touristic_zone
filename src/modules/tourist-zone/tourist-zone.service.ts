import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { PostgresService } from "src/configs";
import { TouristZoneTable } from "./models";
import { FsHelper } from "src/helper";
import { ICreateTourist, IUpdateTourist } from "./interface";


@Injectable()
export class TouristZoneService implements OnModuleInit {
    constructor(private readonly pg: PostgresService, private fs: FsHelper) { }

    async onModuleInit() {
        try {
            await this.pg.query(TouristZoneTable)
            console.log(`Tourist-zone table yaratildi✅`)
        } catch (error) {
            console.log("Tourist-zone table yaratishda xatolik❌")
        }
    }

    async getAllTuristZones() {
        const tourist = await this.pg.query('SELECT * FROM tourist_zones')
        return {
            message: "success",
            count: tourist.length,
            data: tourist
        }
    }

    async create(payload: ICreateTourist) {
        let imageUrl: string[] = [];

        for (let img of payload.images) {
            const image = await this.fs.uploadFile(img);
            const fileName = image.fileUrl.split("\\").pop() as string;
            imageUrl.push(fileName);

        }

        const touristZone = await this.pg.query(
            `INSERT INTO tourist_zones(name,location,description,images) VALUES ($1,$2,$3,$4) RETURNING *`,
            [payload.name, payload.location, payload.description, imageUrl]
        );

        return {
            message: "yaratildi",
            data: touristZone,
        };
    }

    async update(id: number, payload: IUpdateTourist) {
        const founded = await this.pg.query(`SELECT * FROM tourist_zones WHERE id = $1`, [id])

        if (founded.length === 0) {
            throw new NotFoundException(`ID boyicha malumot topilmadi`)
        }

        const touristZone = await this.pg.query(`UPDATE tourist_zones SET 
            name = COALESCE($1,name),
            description = COALESCE($2,description),
            location = COALESCE($3,location)
            WHERE id = $4 RETURNING *
        `, [payload.name, payload.description, payload.location, id])


        return {
            message: "Yangilandi",
            data: touristZone
        }
    }

    async updateImage(id: number, images: Express.Multer.File[]) {
        const founded = await this.pg.query(`SELECT * FROM tourist_zones WHERE id = $1`, [id])

        if (founded.length === 0) {
            throw new NotFoundException(`ID boyicha malumot topilmadi`)
        }

        const oldImage: string[] = founded[0].images

        if (oldImage.length > 0) {
            for (let imgPath of oldImage) {
                await this.fs.deleteFile(imgPath);
            }
        }
        let imageUrls: string[] = [];

        for (let img of images) {
            const image = await this.fs.uploadFile(img);
            const fileName = image.fileUrl.split("\\").pop() as string;
            imageUrls.push(fileName);
        }

        const updated = await this.pg.query(`
        UPDATE tourist_zones SET images = $1 WHERE id = $2 RETURNING *
    `, [imageUrls, id]);

        return {
            message: "Rasmlar yangilandi",
            data: updated
        };

    }

    async delete(id: number) {
        const founded = await this.pg.query(`SELECT * FROM tourist_zones WHERE id = $1`, [id])

        if (founded.length === 0) {
            throw new NotFoundException(`ID boyicha malumot topilmadi`)
        }

        const oldImage: string[] = founded[0].images

        if (oldImage.length > 0) {
            for (let imgPath of oldImage) {
                await this.fs.deleteFile(imgPath);
            }
        }

        await this.pg.query(`DELETE FROM tourist_zones WHERE id = $1`, [id])
    }

}