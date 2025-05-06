import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env?.NODE_ENV?.trim() === "development") {
    app.use(morgan("tiny"))
    console.log(process.env.NODE_ENV)
  }

  app.setGlobalPrefix("/api")
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
    exceptionFactory(errors) {
        let errorMsg = ""
        errors.forEach((err) => {
          errorMsg += `${Object.values(err.constraints as object).join(',')}, `;
        })
        throw new BadRequestException(errorMsg)
    },
  }))

  const config = new DocumentBuilder()
    .setTitle('Tourist Zone')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);
  const PORT = process.env.APP_PORT ? Number(process.env.APP_PORT) : 4000
  await app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} ✅`)
  });
}
bootstrap();
