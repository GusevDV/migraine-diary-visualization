import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

import { Import } from './schemas/import.schema';
import { ImportService } from './import.service';

@Controller('imports')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File) {
    const createImportDto = this.importService.parse(fs.readFileSync(file.path));
    return await this.importService.create(createImportDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Import> {
    return this.importService.findOne(id);
  }
}
