import { Test, TestingModule } from '@nestjs/testing';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { CreateImportDto } from './dto/create-import.dto';

describe('ImportController', () => {
  let controller: ImportController;
  let service: ImportService;

  const createImportDto: CreateImportDto = {
    timestamp: 1672863474,
    headache: true,
  };

  const mockImport = {
    timestamp: 1672863474,
    headache: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportController],
      providers: [
        {
          provide: ImportService,
          useValue: {
            create: jest.fn().mockResolvedValue(createImportDto),
          },
        },
      ],
    }).compile();

    controller = module.get<ImportController>(ImportController);
    service = module.get<ImportService>(ImportService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new import', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockImport);

      await controller.create(createImportDto);
      expect(createSpy).toHaveBeenCalledWith(createImportDto);
    });
  });
});
