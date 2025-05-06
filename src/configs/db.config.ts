import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class PostgresService {
    #_pool: Pool
    constructor() {
        this.#_pool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
    }

    async query(queryStr: string, params: any[] = []) {
        try {
            const { rows } = await this.#_pool.query(queryStr, params)
            return rows;
        } catch (error) {
            throw new InternalServerErrorException(error.message || `Database'ga ulanishda xatolik❌`)
        }

    }
}