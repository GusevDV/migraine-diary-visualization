import { IsArray } from 'class-validator';
import { ImportDto } from './import.dto';

export class CreateImportDto {
  @IsArray()
  records: ImportDto[];
}
