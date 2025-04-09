import { ClassProvider, Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OwnersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(owner: CreateOwnerDto) {
    return this.prisma.owner.create({
      data: {
        identification: owner.identification,
        name: owner.name,
        address: owner.address,
        type: owner.type,
      },
    });
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
    return this.prisma.owner.findMany();
    // return owners.map((owner) => Owner.fromPrisma(owner));
  }

  getAllInfractions(ownerId: string) {
    return this.prisma.infraction.findMany({
      where: {
        ownerId,
      },
      include: {
        vehicle: true,
      },
    });
  }

  getAllVehicles(ownerId: string) {
    return this.prisma.vehicle.findMany({
      where: {
        ownerId,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.vehicle.deleteMany({
      where: {
        ownerId: id,
      },
    });

    return this.prisma.owner.delete({
      where: {
        id,
      },
    });
  }
}

export const OwnersRepositoryProvider: ClassProvider = {
  provide: OwnersRepository,
  useClass: OwnersRepository,
};
