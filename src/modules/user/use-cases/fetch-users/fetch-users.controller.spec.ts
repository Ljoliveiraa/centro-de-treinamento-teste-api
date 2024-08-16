import { Test, TestingModule } from '@nestjs/testing';
import { FetchUsersController } from './fetch-users.controller';

describe('FetchUsersController', () => {
  let controller: FetchUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FetchUsersController],
    }).compile();

    controller = module.get<FetchUsersController>(FetchUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
