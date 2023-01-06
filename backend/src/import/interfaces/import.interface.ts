export interface IImport {
  readonly records: Array<{
    readonly timestamp: number;
    readonly headache: boolean;
  }>;
}
