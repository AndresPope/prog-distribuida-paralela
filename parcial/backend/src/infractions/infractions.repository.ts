import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateInfractionDto } from './dto/create-infraction.dto';

@Injectable()
export class InfractionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(infraction: CreateInfractionDto) {
    return this.prisma.infraction.create({
      data: {
        vehicleId: infraction.vehicleId,
        detectionType: infraction.detectionType,
        ownerId: infraction.ownerId,
        date: infraction.date,
      },
    });
  }

  findAll() {
    return this.prisma.infraction.findMany();
  }

  async exists(id: string) {
    const infraction = await this.prisma.infraction.findUnique({
      where: {
        id,
      },
    });

    return !!infraction;
  }

  remove(id: string) {
    return this.prisma.infraction.delete({
      where: {
        id,
      },
    });
  }
}
