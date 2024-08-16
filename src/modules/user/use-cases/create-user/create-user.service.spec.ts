import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from 'src/modules/user/providers/hashing/hashing.service';
import { UserRepoSpyService } from 'src/modules/user/repositories/user-repo-spy.service';
import { IUserRepo } from 'src/modules/user/repositories/user-repo.interface';
import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let repo: IUserRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        UserRepoSpyService,
        { provide: 'IUserRepo', useExisting: UserRepoSpyService },
        HashingService,
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    repo = module.get<UserRepoSpyService>(UserRepoSpyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const result = await service.execute({
      username: 'joe',
      name: 'Joe',
      email: 'joe@navegam.com.br',
      isActive: true,
      password: 'secret',
      phone: '5592996128381',
      role: 'administrador',
    });

    expect(result.success).toBe(true);
  });

  it('should not create a duplicated user', async () => {
    const userData = {
      username: 'joe',
      name: 'Joe',
      email: 'joe@navegam.com.br',
      isActive: true,
      password: 'secret',
      phone: '5592996128381',
      role: 'administrador',
    };
    await service.execute(userData);
    const result = await service.execute(userData);

    expect(result.success).toBe(false);
  });
});
