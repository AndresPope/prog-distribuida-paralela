import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Infraction } from './entities/infraction.entity';
import { CreateInfractionInput, UpdateInfractionInput } from './gql/inputs.gql';
import { Owner } from '../owners/entities/owner.entity';

@Injectable()
export class InfractionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(infraction: CreateInfractionInput) {
    const response = await this.prisma.infraction.create({
      data: {
        vehicleId: infraction.vehicleId,
        detectionType: infraction.detectionType,
        ownerId: infraction.ownerId,
        date: infraction.date,
      },
    });
    return Infraction.fromPrisma(response);
  }

  async findAll() {
    const response = await this.prisma.infraction.findMany();
    return response.map((res) => Infraction.fromPrisma(res));
  }

  async exists(id: string) {
    const infraction = await this.prisma.infraction.findUnique({
      where: {
        id,
      },
    });

    return !!infraction;
  }

  async remove(id: string) {
    const response = await this.prisma.infraction.delete({
      where: {
        id,
      },
    });
    return Infraction.fromPrisma(response);
  }

  async getInfractionOwner(ownerId: string) {
    const owner = await this.prisma.owner.findUnique({
      where: {
        id: ownerId,
      },
    });

    if (!owner) {
      throw new Error('El propietario no existe');
    }

    return Owner.fromPrisma(owner);
  }

  async getInfractionVehicle(vehicleId: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicle) {
      throw new Error('El vehículo no existe');
    }

    return Vehicle.fromPrisma(vehicle);
  }

  async update(updateInput: UpdateInfractionInput) {
    const response = await this.prisma.infraction.update({
      where: {
        id: updateInput.id,
      },
      data: {
        vehicleId: updateInput.vehicleId,
        detectionType: updateInput.detectionType,
        ownerId: updateInput.ownerId,
        date: updateInput.date,
      },
    });
    return Infraction.fromPrisma(response);
  }
}
