import { Owner as PrismaOwner, OwnerType } from '@prisma/client';
import { Infraction } from '../../infractions/entities/infraction.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

export class Owner {
  constructor(
    private readonly id: string,
    private readonly identification: string,
    private readonly name: string,
    private readonly address: string,
    private readonly type: OwnerType,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
    private readonly vehicles?: Vehicle[],
    private readonly infractions?: Infraction[],
  ) {}

  static fromPrisma(owner: PrismaOwner): Owner {
    return new Owner(
      owner.id,
      owner.identification,
      owner.name,
      owner.address,
      owner.type,
      owner.createdAt,
      owner.updatedAt,
    );
  }

  toJson() {
    return {
      id: this.id,
      identification: this.identification,
      name: this.name,
      address: this.address,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
