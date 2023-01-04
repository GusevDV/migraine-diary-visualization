import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportsModule } from './import/imports.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'diary',
    }),
    ImportsModule,
  ],
})
export class AppModule {}
