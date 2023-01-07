import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import xlsx from 'node-xlsx';

import { IImport } from './interfaces/import.interface';
import { CreateImportDto } from './dto/create-import.dto';
import { ImportDto } from './dto/import.dto';

@Injectable()
export class ImportService {
  constructor(@InjectModel('Import') private importModel: Model<IImport>) {}

  async create(createImportDto: CreateImportDto): Promise<IImport> {
    const newImport = await this.importModel.create(createImportDto);
    return newImport.save();
  }

  async findOne(id: string): Promise<IImport> {
    const existingImport = await this.importModel.findById(id).exec();
    if (!existingImport) {
      throw new NotFoundException(`Import #${id} not found`);
    }
    return existingImport;
  }

  parse(buffer: Buffer): IImport {
    const workSheets = xlsx.parse(buffer, {
      sheets: 0,
    });

    const workSheetData = workSheets[0].data as Array<Array<string>>;

    const preparedData: ImportDto[] = [];

    for (let i = 1; i < workSheetData.length; i++) {
      const [date, , headache] = workSheetData[i];
      const [day, month, year] = date.split('.');
      const timestamp = new Date(Number(year), Number(month) - 1, Number(day)).getTime();
      preparedData.push({
        timestamp,
        headache: headache.toLowerCase() === 'да',
      });
    }

    return {
      records: preparedData,
    };
  }
}
