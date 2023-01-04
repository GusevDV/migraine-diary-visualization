import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportController } from './import.controller';
import { ImportSchema } from './schemas/import.schema';
import { ImportService } from './import.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Import', schema: ImportSchema }]),
  ],
  controllers: [ImportController],
  providers: [ImportService],
})
export class ImportsModule {}
