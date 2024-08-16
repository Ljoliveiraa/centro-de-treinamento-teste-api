import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from 'src/modules/user/providers/hashing/hashing.service';
import { UserRepoSpyService } from 'src/modules/user/repositories/user-repo-spy.service';
import { CreateUserController } from './create-user.controller';
import { CreateUserService } from './create-user.service';

describe('CreateUserController', () => {
  let controller: CreateUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        CreateUserService,
        UserRepoSpyService,
        { provide: 'IUserRepo', useExisting: UserRepoSpyService },
        HashingService,
      ],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
