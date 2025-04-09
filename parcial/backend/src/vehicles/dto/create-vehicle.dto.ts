import { VehicleType } from '@prisma/client';

export class CreateVehicleDto {
  plate: string;
  brand: string;
  type: VehicleType;
  ownerId: string;
}
