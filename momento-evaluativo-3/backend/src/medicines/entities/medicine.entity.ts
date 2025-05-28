import { Medicine as PrismaMedicine } from '@prisma/client';
import { MedicineType } from '../gql/medicines.gql';

export class Medicine {
  private constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly kind: MedicineType,
    private readonly laboratory: string,
    private readonly quantity: number,
    private readonly expirationDate: Date,
    private readonly registrationDate: Date,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
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
