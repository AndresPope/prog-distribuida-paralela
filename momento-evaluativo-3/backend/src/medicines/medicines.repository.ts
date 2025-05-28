import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Medicine } from './entities/medicine.entity';
import { CreateMedicineGqlInput, UpdateMedicineInput } from './gql/inputs.gql';

@Injectable()
export class MedicinesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(medicine: CreateMedicineGqlInput) {
    const response = await this.prisma.medicine.create({
      data: {
        name: medicine.name,
        kind: medicine.kind,
        laboratory: medicine.laboratory,
        quantity: medicine.quantity,
        expirationDate: medicine.expirationDate,
      },
    });
    return Medicine.fromPrisma(response);
  }

  async findAll() {
    const medicines = await this.prisma.medicine.findMany();
    return medicines.map((med) => Medicine.fromPrisma(med));
  }

  async medicineExists(id: number) {
    const v = await this.prisma.medicine.findUnique({
      where: {
        id,
      },
    });
    return v !== null;
  }

  async remove(id: number) {
    const response = await this.prisma.medicine.delete({
      where: {
        id,
      },
    });
    return Medicine.fromPrisma(response);
  }

  async update(updateInput: UpdateMedicineInput) {
    const response = await this.prisma.medicine.update({
      where: {
        id: updateInput.id,
      },
      data: {
        name: updateInput.name,
        kind: updateInput.kind,
        laboratory: updateInput.laboratory,
        quantity: updateInput.quantity,
        expirationDate: updateInput.expirationDate,
      },
    });
    return Medicine.fromPrisma(response);
  }
}
