import { Entity, EntityMetadata } from 'src/shared/core/entity';
import { UserRoleOptions } from 'src/modules/user/enums';
import * as bcrypt from 'bcrypt';
import { UserSolicitationStatus } from '../../enums/user-solicitation-status.enum';

interface UserProps {
  name: string;
  email: string;
  address?: Location;
  isActive: boolean;
  password: string;
  phone?: string;
  backupPhone?: string;
  role: string;
  loginAt?: Date;
  passwordResetCode?: string;
}

export class User extends Entity<UserProps> {
  [x: string]: {};
  private constructor(props: UserProps, metadata?: EntityMetadata) {
    super(props, metadata);
  }

  static create(props: UserProps, metadata?: EntityMetadata) {
    if (!UserRoleOptions.includes(props.role as any))
      throw new Error('Invalid user type');

    return new User(props, metadata);
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    if (name.length < 1) throw new Error('Name cannot be empty');
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get isActive() {
    return this.props.isActive;
  }

  activate() {
    this.props.isActive = true;
  }

  deactivate() {
    this.props.isActive = false;
  }

  get password() {
    return this.props.password;
  }

  set password(raw: string) {
    this.props.password = bcrypt.hashSync(raw, 10);
  }

  isPasswordValid(pass: string) {
    return bcrypt.compareSync(pass, this.password);
  }

  get phone() {
    return this.props.phone;
  }

  set phone(phone: string) {
    this.props.phone = phone;
  }

  get backupPhone() {
    return this.props.backupPhone;
  }

  set backupPhone(value: string) {
    this.props.backupPhone = value;
  }

  get role() {
    return this.props.role;
  }

  set role(role: string) {
    this.props.role = role;
  }

  get loginAt() {
    return this.props.loginAt;
  }

  get passwordResetCode() {
    return this.props.passwordResetCode;
  }

  set passwordResetCode(password: string) {
    this.props.passwordResetCode = password;
  }

  wipeRecoveryCode() {
    this.props.passwordResetCode = null;
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive;
  }
}
