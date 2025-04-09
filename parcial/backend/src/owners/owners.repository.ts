import { Injectable } from '@nestjs/common';
import { CreateOwnerInput, UpdateOwnerInput } from './gql/inputs.gql';
import { PrismaService } from '../prisma.service';
import { Owner } from './entities/owner.entity';
import { Infraction } from '../infractions/entities/infraction.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

@Injectable()
export class OwnersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(owner: CreateOwnerInput) {
    const response = await this.prisma.owner.create({
      data: {
        identification: owner.identification,
        name: owner.name,
        address: owner.address,
        type: owner.type,
      },
    });
    return Owner.fromPrisma(response);
  }

  async ownerExists(ownerId: string) {
    const owner = await this.prisma.owner.findUnique({
      where: {
        identification: ownerId,
      },
    });
    return owner !== null;
  }

  async findAll() {
    const owners = await this.prisma.owner.findMany();
    return owners.map((owner) => Owner.fromPrisma(owner));
  }

  async getAllInfractions(ownerId: string) {
    const infractions = await this.prisma.infraction.findMany({
      where: {
        ownerId,
      },
      include: {
        vehicle: true,
      },
    });
    return infractions.map((inf) => Infraction.fromPrisma(inf));
  }

  async getAllVehicles(ownerId: string) {
    const vehicles = await this.prisma.vehicle.findMany({
      where: {
        ownerId,
      },
    });

    return vehicles.map((vehicle) => Vehicle.fromPrisma(vehicle));
  }

  async remove(id: string) {
    await this.prisma.vehicle.deleteMany({
      where: {
        ownerId: id,
      },
    });

    const owner = await this.prisma.owner.delete({
      where: {
        id,
      },
    });

    return Owner.fromPrisma(owner);
  }

  async update(updateOwner: UpdateOwnerInput) {
    const response = await this.prisma.owner.update({
      where: {
        id: updateOwner.id,
      },
      data: {
        identification: updateOwner.identification,
        name: updateOwner.name,
        address: updateOwner.address,
        type: updateOwner.type,
      },
    });
    return Owner.fromPrisma(response);
  }
}
