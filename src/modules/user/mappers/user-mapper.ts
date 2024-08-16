import { User as UserEntity } from '@prisma/client';
import { User } from '../domains/user/user';
import { UserDTO } from '../dtos/user.dto';

export class UserMapper {
  static toDomain(raw: UserEntity & {}): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        isActive: raw.isActive,
        // phone: raw.phone,
        backupPhone: raw.backupPhone,
        role: raw.role,
        password: raw.password,
        loginAt: raw.loginAt,
        passwordResetCode: raw.passwordResetCode,
      },
      { id: raw.id, createdAt: raw.createdAt, updatedAt: raw.updatedAt },
    );
  }

  static toDTO(d: User): Partial<UserDTO> {
    return {
      id: d.id as number,
      name: d.name,
      // phone: d.phone,
      backupPhone: d.backupPhone,
      role: d.role,
      loginAt: d.loginAt,
      passwordResetCode: d.passwordResetCode,
      updatedAt: d.updatedAt,
    };
  }
}
