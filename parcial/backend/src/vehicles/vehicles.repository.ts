import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(vehicle: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: {
        plate: vehicle.plate,
        brand: vehicle.brand,
        type: vehicle.type,
        ownerId: vehicle.ownerId,
      },
    });
  }

  findAll() {
    return this.prisma.vehicle.findMany();
  }

  async vehicleExists(vehicleId: string) {
    const v = await this.prisma.vehicle.findUnique({
      where: {
        plate: vehicleId,
      },
    });
    return v !== null;
  }

  async vehicleIdExists(id: string) {
    const v = await this.prisma.vehicle.findUnique({
      where: {
        id,
      },
    });
    return v !== null;
  }

  async hasInfractions(id: string) {
    const infractions = await this.prisma.infraction.findMany({
      where: {
        vehicleId: id,
      },
    });
    return infractions.length > 0;
  }

  remove(id: string) {
    return this.prisma.vehicle.delete({
      where: {
        id,
      },
    });
  }
}
