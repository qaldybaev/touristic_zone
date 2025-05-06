export class ICreateTourist{
    name: string;
    description?: string;
    location: string;
    images: Express.Multer.File[];
}

export class IUpdateTourist{
    name?: string;
    description?: string;
    location?: string;
}
