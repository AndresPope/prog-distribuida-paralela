import { OwnerType } from '@prisma/client';

export class CreateOwnerDto {
  identification: string;
  name: string;
  address: string;
  type: OwnerType;
}
