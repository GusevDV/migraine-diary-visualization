import { Test, TestingModule } from '@nestjs/testing';
import { ImportService } from './import.service';
import { Import } from './schemas/import.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const mockImport = {
  timestamp: 1672863474,
  headache: true,
};

describe('ImportService', () => {
  let service: ImportService;
  let model: Model<Import>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImportService,
        {
          provide: getModelToken('Import'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockImport),
            constructor: jest.fn().mockResolvedValue(mockImport),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ImportService>(ImportService);
    model = module.get<Model<Import>>(getModelToken('Import'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert a new import', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        timestamp: 1672863474,
        headache: true,
      }),
    );
    const newImport = await service.create({
      timestamp: 1672863474,
      headache: true,
    });
    expect(newImport).toEqual(mockImport);
  });
});
