import { Infraction as PrismaInfraction } from '@prisma/client';
import { DetectionType } from '../gql/infraction.gql';

export class Infraction {
  private constructor(
    private readonly id: string,
    private readonly date: Date,
    private readonly detectionType: DetectionType,
    private readonly vehicleId: string,
    private readonly ownerId: string | null,
    private readonly createdAt: Date,
  ) {}

  static fromPrisma(infraction: PrismaInfraction): Infraction {
    return new Infraction(
      infraction.id,
      infraction.date,
      infraction.detectionType as DetectionType,
      infraction.vehicleId,
      infraction.ownerId,
      infraction.createdAt,
    );
  }

  public toJson() {
    return {
      id: this.id,
      date: this.date,
      detectionType: this.detectionType,
      vehicleId: this.vehicleId,
      ownerId: this.ownerId,
      createdAt: this.createdAt,
    };
  }
}
