export interface IImport {
  readonly records: [
    {
      readonly timestamp: number;
      readonly headache: boolean;
    },
  ];
}
