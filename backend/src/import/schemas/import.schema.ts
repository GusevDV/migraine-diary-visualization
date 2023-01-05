import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Import {
  @Prop()
  records: [
    {
      timestamp: number;
      headache: boolean;
    },
  ];
}
export const ImportSchema = SchemaFactory.createForClass(Import);
