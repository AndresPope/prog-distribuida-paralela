import { DetectionType } from '@prisma/client';

export class CreateInfractionDto {
  detectionType: DetectionType;
  vehicleId: string;
  ownerId: string;
  date: Date;
}
