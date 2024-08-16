import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/modules/user/domains/user/user';
import { UserRepoSpyService } from 'src/modules/user/repositories/user-repo-spy.service';
import { AuthenticateUserService } from './authenticate-user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { HashingService } from 'src/modules/user/providers/hashing/hashing.service';

describe('AuthenticateUserService', () => {
  let service: AuthenticateUserService;
  let userRepo: UserRepoSpyService;
  let jwtService: JwtService;
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
        AuthenticateUserService,
        UserRepoSpyService,
        { provide: 'IUserRepo', useExisting: UserRepoSpyService },
        HashingService,
      ],
    }).compile();

    service = module.get<AuthenticateUserService>(AuthenticateUserService);
    userRepo = module.get<UserRepoSpyService>(UserRepoSpyService);
    jwtService = module.get<JwtService>(JwtService);
    hashingService = module.get<HashingService>(HashingService);

    const hash = await hashingService.hash('super-secret');

    await userRepo.save(
      User.create({
        username: 'zyowoo',
        name: 'Zyowoo',
        email: 'zyowoo@email.com',
        isActive: true,
        role: 'supervisor',
        phone: '5592983172717',
        password: hash,
      }),
    );
  });

  it('should return a valid user object', async () => {
    const username = 'zyowoo';
    const password = 'super-secret';
    const user = await service.validateUser(username, password);
    expect(user).toBeInstanceOf(User);
  });

  it('should not return a valid user', async () => {
    const email = 'zyowoo@email.com';
    const password = 'wrong-pass';
    const user = await service.validateUser(email, password);
    expect(user).toBeNull();
  });

  it('should return a valid access token', async () => {
    const username = 'zyowoo';
    const password = 'super-secret';
    const user = await service.validateUser(username, password);

    const accessToken = service.getAccessToken(user);
    const decoded = jwtService.verify(accessToken);
    expect(decoded.email).toBe('zyowoo@email.com');
  });
});
