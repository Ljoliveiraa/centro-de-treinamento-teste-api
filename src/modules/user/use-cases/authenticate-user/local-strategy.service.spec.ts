import { Test, TestingModule } from '@nestjs/testing';
import { UserRepoSpyService } from 'src/modules/user/repositories/user-repo-spy.service';
import { AuthenticateUserService } from './authenticate-user.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/modules/user/domains/user/user';
import { HashingService } from 'src/modules/user/providers/hashing/hashing.service';

describe('LocalStrategyService', () => {
  let service: LocalStrategy;
  let userRepo: UserRepoSpyService;
  let hashingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.jwtSecret,
          signOptions: {
            expiresIn: '1h',
          },
        }),
      ],
      providers: [
        LocalStrategy,
        AuthenticateUserService,
        UserRepoSpyService,
        { provide: 'IUserRepo', useExisting: UserRepoSpyService },
        HashingService,
      ],
    }).compile();

    service = module.get<LocalStrategy>(LocalStrategy);
    userRepo = module.get<UserRepoSpyService>(UserRepoSpyService);
    hashingService = module.get<HashingService>(HashingService);
  });

  it('should throw an unauthorized exception', () => {
    const username = 'bit@email.com';
    const password = 'super-secret';
    const promise = service.validate(username, password);
    expect(promise).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should return a valid user object', async () => {
    const hash = await hashingService.hash('super-secret');
    userRepo.save(
      User.create({
        username: 's1mple',
        name: 'S1mple',
        email: 's1mple@email.com',
        isActive: true,
        password: hash,
        role: 'administrador',
        phone: '55929928387372',
      }),
    );

    const user = await service.validate('s1mple', 'super-secret');
    expect(user).toBeInstanceOf(User);
  });
});
