import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ImportDto {
  @IsNumber()
  @IsNotEmpty()
  readonly timestamp: number;
  @IsBoolean()
  @IsNotEmpty()
  readonly headache: boolean;
}
