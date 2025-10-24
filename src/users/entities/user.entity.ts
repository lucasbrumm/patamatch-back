import { UserType } from '@prisma/client';

export class User {
  id: number;
  email: string;
  name?: string;
  phone?: string;
  userType: UserType;
}
