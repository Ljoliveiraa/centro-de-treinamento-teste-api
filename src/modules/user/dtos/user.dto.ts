import { DriverBankAccountDTO } from './driver-bank-account.dto';
import { DriverDocumentsDTO } from './driver-documents.dto';

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  photoUrl?: string;
  isActive: boolean;
  // phone: string;
  backupPhone?: string;
  role: string;
  loginAt?: Date;
  passwordResetCode?: string;
  createdAt: Date;
  updatedAt: Date;
}
