import { Inject, Injectable, Optional } from '@nestjs/common';
import { PaginationResult } from 'src/shared/interfaces/pagination-result';
import { User } from '../domains/user/user';
import { IUserRepo, OrderBy, Sort } from './user-repo.interface';
import { UserRole } from '../enums';

@Injectable()
export class UserRepoSpyService implements IUserRepo {
  private readonly users: User[];

  constructor(@Optional() @Inject('UserCollection') users: User[]) {
    this.users = users || [];
  }

  disableUser(userId: number): Promise<void> {
    return;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((u) => u.email === email);
  }

  async findById(id: number): Promise<User> {
    return this.users.find((u) => u.id === id);
  }

  async findByDocument(option: { cpf?: string; rg?: string }): Promise<User> {
    return this.users.find((e) => e.cpf === option.cpf || e.rg === option.rg);
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = user;
  }

  async updateDriver(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = user;
  }

  async deleteDriver(driverId: number): Promise<void> {
    this.users.findIndex((u) => u.id === driverId);
  }

  async findAll(options: {
    page: number;
    pageSize: number;
    nameOrEmail?: string;
    role?: string;
    orderBy?: OrderBy;
    sort?: Sort;
    isActive?: boolean;
  }): Promise<PaginationResult<User>> {
    return { total: this.users.length, data: this.users };
  }

  async findAllDrivers(options: {
    page: number;
    pageSize: number;
    name?: string;
    role?: string;
    orderBy?: OrderBy;
    sort?: Sort;
    isActive?: boolean;
  }): Promise<PaginationResult<User>> {
    return { total: this.users.length, data: this.users };
  }

  async findByIds(ids: number[]): Promise<User[]> {
    return this.users.filter((u, index) => u.id === ids[index]);
  }
}
