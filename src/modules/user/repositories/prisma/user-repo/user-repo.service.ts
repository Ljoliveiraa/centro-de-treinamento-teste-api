import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { PaginationResult } from 'src/shared/interfaces/pagination-result';
import { User } from 'src/modules/user/domains/user/user';
import { UserMapper } from 'src/modules/user/mappers/user-mapper';
import { IUserRepo, OrderBy, Sort } from '../../user-repo.interface';
import { UserDocumentType, UserRole } from 'src/modules/user/enums';
import { UserSolicitationStatus } from 'src/modules/user/enums/user-solicitation-status.enum';

@Injectable()
export class UserRepoService implements IUserRepo {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<User> {
    const result = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        // address: {
        //   connect: { id: user.address?.id as number },
        // },
        // bankAccount: {
        //   connect: {
        //     id: user.bankAccount?.id as number,
        //   },
        // },
        isActive: user.isActive,
        phone: user?.phone,
        backupPhone: user.backupPhone,
        password: user.password,
        role: user.role,
      },
    });

    return UserMapper.toDomain(result);
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!result) return;

    return UserMapper.toDomain(result);
  }

  async findById(id: number): Promise<User> {
    const result = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!result) return;

    return UserMapper.toDomain(result);
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id as number },
      data: {
        name: user.name,
        email: user.email,
        phone: user?.phone,
        backupPhone: user.backupPhone,
        role: user.role,
        isActive: user.isActive,
        password: user.password,
        passwordResetCode: user.passwordResetCode,
        photoUrl: user.photoUrl,
      },
    });
  }

  async findAll(options: {
    page: number;
    pageSize: number;
    name?: string;
    role?: string;
    orderBy?: OrderBy;
    sort?: Sort;
    isActive?: boolean;
    companyId?: number;
  }): Promise<PaginationResult<User>> {
    const whereClause = { AND: [] };

    if (!!options.name) {
      whereClause.AND.push({
        name: { contains: options.name },
      });
    }
    if (!!options.role)
      whereClause.AND.push({ role: { equals: options.role } });

    if (!!options.companyId)
      whereClause.AND.push({ companyId: { equals: options.companyId } });

    if (typeof options.isActive !== 'undefined')
      whereClause.AND.push({ isActive: { equals: options.isActive } });

    const orderByClause = {
      name: { name: options.sort },
      role: { role: options.sort },
      email: { email: options.sort },
      createdAt: { createdAt: options.sort },
    };

    const skip = options.pageSize * (options.page - 1);
    const take = options.pageSize;
    const total = await this.prisma.user.count({ where: whereClause });
    const data = await this.prisma.user.findMany({
      skip,
      take,
      where: whereClause,
      orderBy: orderByClause[options.orderBy],
    });

    return { total, data: data.map((e) => UserMapper.toDomain(e)) };
  }

  async deleteDriver(driverId: number): Promise<void> {
    await this.prisma.user.delete({ where: { id: driverId } });
  }

  async disableUser(userId: number): Promise<void> {
    await this.prisma.user.delete({ where: { id: userId } });
  }

  async findByIds(ids: number[]): Promise<User[]> {
    const result = await this.prisma.user.findMany({
      where: { id: { in: ids } },
    });

    if (!result) return;

    return result && result.map(UserMapper.toDomain);
  }

  async findByDocument(option: { cpf?: string; rg?: string }): Promise<User> {
    const result = await this.prisma.user.findFirst({
      include: {},
    });

    if (!result) return;

    return UserMapper.toDomain(result);
  }
}
