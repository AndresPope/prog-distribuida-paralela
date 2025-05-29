import { Medicine as PrismaMedicine } from '@prisma/client';
import { MedicineType } from '../gql/medicines.gql';

export class Medicine {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly kind: MedicineType,
    public readonly laboratory: string,
    public readonly quantity: number,
    public readonly expirationDate: Date,
    public readonly registrationDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static fromPrisma(med: PrismaMedicine): Medicine {
    const kind = med.kind as MedicineType;
    return new Medicine(
      med.id,
      med.name,
      kind,
      med.laboratory,
      med.quantity,
      med.expirationDate,
      med.registrationDate,
      med.createdAt,
      med.updatedAt,
    );
  }

  public toJson() {
    return {
      id: this.id,
      name: this.name,
      kind: this.kind,
      laboratory: this.laboratory,
      quantity: this.quantity,
      expirationDate: this.expirationDate,
      registrationDate: this.registrationDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
