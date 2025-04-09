import { Infraction as PrismaInfraction, DetectionType } from '@prisma/client';
import { Owner } from '../../owners/entities/owner.entity';

export class Infraction {
  private constructor(
    private readonly id: string,
    private readonly date: Date,
    private readonly detectionType: DetectionType,
    private readonly vehicleId: string,
    private readonly createdAt: Date,
    private readonly owner?: Owner,
    private readonly ownerId?: string,
  ) {}

  static fromPrisma(infraction: PrismaInfraction): Infraction {
    console.log('=>(infraction.entity.ts:16) infraction', infraction);
    return new Infraction(
      infraction.id,
      infraction.date,
      infraction.detectionType,
      infraction.vehicleId,
      infraction.createdAt,
    );
  }
}
