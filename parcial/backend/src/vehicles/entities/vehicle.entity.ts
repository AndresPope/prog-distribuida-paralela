import { VehicleType, Vehicle as PrismaVehicle } from '@prisma/client';
import { Owner } from '../../owners/entities/owner.entity';
import { Infraction } from '../../infractions/entities/infraction.entity';

export class Vehicle {
  private constructor(
    private readonly id: string,
    private readonly plate: string,
    private readonly brand: string,
    private readonly registrationDate: Date,
    private readonly type: VehicleType,
    private readonly ownerId: string,
    private readonly infractions: Infraction[],
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
    private readonly owner?: Owner,
  ) {}

  static fromPrisma(vehicle: PrismaVehicle): Vehicle {
    console.log('=>(vehicle.entity.ts:20) vehicle', vehicle);
    return new Vehicle(
      vehicle.id,
      vehicle.plate,
      vehicle.brand,
      vehicle.registrationDate,
      vehicle.type,
      vehicle.ownerId,
      [],
      vehicle.createdAt,
      vehicle.updatedAt,
    );
  }
}
