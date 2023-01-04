import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Import {
  @Prop({ required: true })
  timestamp: number;
  @Prop({ required: true })
  headache: boolean;
}
export const ImportSchema = SchemaFactory.createForClass(Import);
