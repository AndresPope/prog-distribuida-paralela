import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Infraction } from '../infractions/entities/infraction.entity';
import { Owner } from 'src/owners/entities/owner.entity';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleInput, UpdateVehicleInput } from './gql/inputs.gql';

@Injectable()
export class VehiclesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(vehicle: CreateVehicleInput) {
    const response = await this.prisma.vehicle.create({
      data: {
        plate: vehicle.plate,
        brand: vehicle.brand,
        type: vehicle.type,
        ownerId: vehicle.ownerId,
      },
    });
    return Vehicle.fromPrisma(response);
  }

  async findAll() {
    const vehicles = await this.prisma.vehicle.findMany();
    return vehicles.map((vehicle) => Vehicle.fromPrisma(vehicle));
  }

  async vehicleExists(vehicleId: string) {
    const v = await this.prisma.vehicle.findUnique({
      where: {
        plate: vehicleId,
      },
    });
    return v !== null;
  }

  async vehicleExistsId(vehicleId: string) {
    const v = await this.prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
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

  async remove(id: string) {
    const response = await this.prisma.vehicle.delete({
      where: {
        id,
      },
    });
    return Vehicle.fromPrisma(response);
  }

  async getAllVehicleInfractions(id: string) {
    const infractions = await this.prisma.infraction.findMany({
      where: {
        vehicleId: id,
      },
    });

    return infractions.map((infraction) => Infraction.fromPrisma(infraction));
  }

  async getVehicleOwner(ownerId: string) {
    const owner = await this.prisma.owner.findUnique({
      where: {
        id: ownerId,
      },
    });

    if (!owner) {
      throw new Error(`El propietario con id ${ownerId} no existe`);
    }

    return Owner.fromPrisma(owner);
  }

  async update(updateInput: UpdateVehicleInput) {
    const response = await this.prisma.vehicle.update({
      where: {
        id: updateInput.id,
      },
      data: {
        plate: updateInput.plate,
        brand: updateInput.brand,
        type: updateInput.type,
        ownerId: updateInput.ownerId,
      },
    });
    return Vehicle.fromPrisma(response);
  }
}
