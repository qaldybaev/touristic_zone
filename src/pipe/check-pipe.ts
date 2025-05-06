import { ArgumentMetadata, ConflictException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CheckFileSizePipe implements PipeTransform{
    limit:number
    constructor(limit:number){
        this.limit = limit
    }
    transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
        console.log(this.limit)
        console.log(value)
        if(!value || !value.size){
            throw new ConflictException("Rasm yuborilmadi!")
        }
        if(value.size > this.limit ){
            throw new ConflictException(`File olchami ${this.limit / 1024 / 1024}mb'tan kichik bolishi kerak`)
        }else{
            return value
        }
    }

}