import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domains/user/user';
import { UseCase } from 'src/shared/core/use-case';
import { IUserRepo } from '../../repositories/user-repo.interface';

type Input = {};

type Result = {
  status: 'success';
  data: User[];
};

@Injectable()
export class FetchUsersService implements UseCase<Input, Result> {
  constructor(@Inject('IUserRepo') private readonly userRepo: IUserRepo) {}

  async execute(input: Input): Promise<Result> {
    const result = await this.userRepo.findAll({ page: 1, pageSize: 1000 });
    return { status: 'success', data: result.data };
  }
}
