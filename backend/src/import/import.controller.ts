import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ImportService } from './import.service';
import { Import } from './schemas/import.schema';
import { CreateImportDto } from './dto/create-import.dto';

@Controller('imports')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post()
  async create(@Body() createImportDto: CreateImportDto) {
    return await this.importService.create(createImportDto);
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Import> {
    return this.importService.getOne(id);
  }
}
