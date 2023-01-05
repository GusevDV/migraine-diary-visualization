import { Test, TestingModule } from '@nestjs/testing';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { CreateImportDto } from './dto/create-import.dto';
import { Readable } from 'stream';
import mockfs from 'mock-fs';

const file: Express.Multer.File = {
  fieldname: 'file.csv',
  originalname: 'file.csv',
  path: '/files/',
  stream: new Readable(),
  encoding: '1',
  size: 1,
  destination: '',
  filename: '',
  mimetype: 'text/csv',
  buffer: Buffer.from('one,two,three'),
};

afterEach(() => {
  mockfs.restore();
});

mockfs({
  '/files/': {
    'file.csv': 'file content here',
  },
});

describe('ImportController', () => {
  let controller: ImportController;
  let service: ImportService;

  const createImportDto: CreateImportDto = {
    records: [{ timestamp: 1672863474, headache: true }],
  };

  const mockImport = {
    records: [{ timestamp: 1672863474, headache: true }],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportController],
      providers: [
        {
          provide: ImportService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              records: [
                {
                  timestamp: 1672863474,
                  headache: true,
                },
              ],
            }),
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

  describe('create', () => {
    it('should create a new import', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const createSpy = jest.spyOn(service, 'create').mockResolvedValueOnce(mockImport);

      await controller.create(file);
      expect(createSpy).toHaveBeenCalledWith(createImportDto);

      await expect(controller.create(file)).resolves.toEqual(mockImport);
    });
  });

  describe('findOne', () => {
    it('should return the document', async () => {
      await expect(controller.findOne('63b5e128f7285a274efba552')).resolves.toEqual({
        timestamp: 1672863474,
        headache: true,
      });
      expect(service.findOne).toHaveBeenCalled();
    });
  });
});
