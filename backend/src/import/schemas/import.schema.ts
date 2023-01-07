import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Import {
  @Prop()
  records: Array<{
    timestamp: number;
    headache: boolean;
  }>;
}
export const ImportSchema = SchemaFactory.createForClass(Import);
