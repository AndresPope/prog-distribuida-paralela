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
}
