import { Test, TestingModule } from '@nestjs/testing';
import { FetchUsersService } from './fetch-users.service';

describe('FetchUsersService', () => {
  let service: FetchUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchUsersService],
    }).compile();

    service = module.get<FetchUsersService>(FetchUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
