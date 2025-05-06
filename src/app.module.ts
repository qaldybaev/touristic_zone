import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TouristZoneModel } from './modules/tourist-zone';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filter';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TouristZoneModel,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
  ]
})
export class AppModule { }
