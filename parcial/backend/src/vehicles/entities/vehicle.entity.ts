import { Vehicle as PrismaVehicle } from '@prisma/client';
import { VehicleType } from '../gql/vehicle.gql';

export class Vehicle {
  private constructor(
    private readonly id: string,
    private readonly plate: string,
    private readonly brand: string,
    private readonly registrationDate: Date,
    private readonly type: VehicleType,
    private readonly ownerId: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  static fromPrisma(vehicle: PrismaVehicle): Vehicle {
    return new Vehicle(
      vehicle.id,
      vehicle.plate,
      vehicle.brand,
      vehicle.registrationDate,
      vehicle.type as VehicleType,
      vehicle.ownerId,
      vehicle.createdAt,
      vehicle.updatedAt,
    );
  }

  public toJson() {
    return {
      id: this.id,
      plate: this.plate,
      brand: this.brand,
      registrationDate: this.registrationDate,
      type: this.type,
      ownerId: this.ownerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
