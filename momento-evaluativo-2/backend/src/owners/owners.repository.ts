import { ClassProvider, Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { PrismaService } from '../prisma.service';
import { Owner } from './entities/owner.entity';

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
}

export const OwnersRepositoryProvider: ClassProvider = {
  provide: OwnersRepository,
  useClass: OwnersRepository,
};
