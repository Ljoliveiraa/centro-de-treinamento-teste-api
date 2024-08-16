import { PaginationResult } from 'src/shared/interfaces/pagination-result';
import { User } from '../domains/user/user';

export type Sort = 'asc' | 'desc';
export type OrderBy = 'name' | 'role' | 'email' | 'createdAt';

export interface IUserRepo {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: number): Promise<User>;
  update(user: User): Promise<void>;
  findAll(options: {
    page: number;
    pageSize: number;
    name?: string;
    role?: string;
    orderBy?: OrderBy;
    sort?: Sort;
    isActive?: boolean;
    companyId?: number;
  }): Promise<PaginationResult<User>>;

  disableUser(userId: number): Promise<void>;
  findByIds(ids: number[]): Promise<User[]>;
  findByDocument(option: { cpf?: string; rg?: string }): Promise<User>;
}
