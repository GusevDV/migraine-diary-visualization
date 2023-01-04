import { Document } from 'mongoose';

export interface IImport extends Document {
  readonly timestamp: number;
  readonly headache: boolean;
}
