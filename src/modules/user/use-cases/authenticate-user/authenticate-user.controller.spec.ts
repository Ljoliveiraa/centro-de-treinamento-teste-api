import { Test, TestingModule } from '@nestjs/testing';
import { UserRepoSpyService } from 'src/modules/user/repositories/user-repo-spy.service';
import { AuthenticateUserController } from './authenticate-user.controller';
import { AuthenticateUserService } from './authenticate-user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

describe('AuthenticateUserController', () => {
  let controller: AuthenticateUserController;

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
      controllers: [AuthenticateUserController],
      providers: [
        AuthenticateUserService,
        UserRepoSpyService,
        { provide: 'IUserRepo', useExisting: UserRepoSpyService },
      ],
    }).compile();

    controller = module.get<AuthenticateUserController>(
      AuthenticateUserController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
