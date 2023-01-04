import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IImport } from './interfaces/import.interface';
import { CreateImportDto } from './dto/create-import.dto';

@Injectable()
export class ImportService {
  constructor(@InjectModel('Import') private importModel: Model<IImport>) {}

  async create(createImportDto: CreateImportDto): Promise<IImport> {
    const newImport = await new this.importModel(createImportDto);
    return newImport.save();
  }

  async getOne(id: string): Promise<IImport> {
    const existingImport = await this.importModel.findById(id).exec();
    if (!existingImport) {
      throw new NotFoundException(`Import #${id} not found`);
    }
    return existingImport;
  }
}
