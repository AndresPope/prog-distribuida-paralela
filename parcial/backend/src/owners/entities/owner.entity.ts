import { Owner as PrismaOwner } from '@prisma/client';
import { OwnerType } from '../gql/owner.gql';

export class Owner {
  constructor(
    private readonly id: string,
    private readonly identification: string,
    private readonly name: string,
    private readonly address: string,
    private readonly type: OwnerType,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  static fromPrisma(owner: PrismaOwner): Owner {
    const type = owner.type as OwnerType;
    return new Owner(
      owner.id,
      owner.identification,
      owner.name,
      owner.address,
      type,
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
