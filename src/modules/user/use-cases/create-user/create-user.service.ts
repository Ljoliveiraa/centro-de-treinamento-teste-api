import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/domains/user/user';
import { IUserRepo } from 'src/modules/user/repositories/user-repo.interface';
import { UseCase } from 'src/shared/core/use-case';
import { HashingService } from 'src/modules/user/providers/hashing/hashing.service';
import { UserRole } from '../../enums';

interface CreateUserInput {
  name: string;
  role: UserRole;
  isActive: boolean;
  email: string;
  password: string;
}

type CreateUserSuccess = {
  success: true;
  status: 'CreateUserSuccess';
  user: User;
};

type EmailAlreadyExistsError = {
  success: false;
  status: 'EmailAlreadyExists';
};

type UsernameAlreadyExistsError = {
  success: false;
  status: 'UsernameAlreadyRegistered';
};

type CreateUserResult =
  | CreateUserSuccess
  | EmailAlreadyExistsError
  | UsernameAlreadyExistsError;

@Injectable()
export class CreateUserService
  implements UseCase<CreateUserInput, CreateUserResult>
{
  constructor(
    @Inject('IUserRepo') private readonly userRepo: IUserRepo,
    private readonly hashingService: HashingService,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserResult> {
    const existingUserOrUndefined = await this.userRepo.findByEmail(
      input.email,
    );

    if (!!existingUserOrUndefined)
      return { success: false, status: 'EmailAlreadyExists' };

    input.password = await this.hashingService.hash(input.password);

    let user = User.create(input);
    user = await this.userRepo.save(user);

    return { success: true, status: 'CreateUserSuccess', user };
  }
}
