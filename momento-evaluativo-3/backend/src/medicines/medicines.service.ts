import { Injectable } from '@nestjs/common';
import { MedicinesRepository } from './medicines.repository';
import { MedicineType, MedsStats } from './gql/medicines.gql';
import { CreateMedicineGqlInput, UpdateMedicineInput } from './gql/inputs.gql';
import { Medicine } from './entities/medicine.entity';

@Injectable()
export class MedicinesService {
  constructor(private readonly medicinesRepository: MedicinesRepository) {}

  async create(createMedicineInput: CreateMedicineGqlInput): Promise<Medicine> {
    if (!Object.values(MedicineType).includes(createMedicineInput.kind)) {
      throw new Error(
        `El tipo de medicina ${createMedicineInput.kind} no es valido`,
      );
    }

    return this.medicinesRepository.create(createMedicineInput);
  }

  findAll() {
    return this.medicinesRepository.findAll();
  }

  async update(updateInput: UpdateMedicineInput) {
    const medicineNotExists = await this.medicinesRepository.medicineExists(
      updateInput.id,
    );

    if (!medicineNotExists) {
      throw new Error(`La medicina con id ${updateInput.id} no existe`);
    }

    if (!Object.values(MedicineType).includes(updateInput.kind)) {
      throw new Error(`El tipo de medicina ${updateInput.kind} no es valido`);
    }

    return this.medicinesRepository.update(updateInput);
  }

  async remove(id: number) {
    const medicineExists = await this.medicinesRepository.medicineExists(id);
    if (!medicineExists) {
      throw new Error(`El vehiculo con placa ${id} no existe`);
    }
    return this.medicinesRepository.remove(id);
  }

  async getStats(): Promise<MedsStats> {
    const meds = await this.findAll();
    const total = meds.length;

    const typeCount = meds.reduce((acc, med) => {
      acc[med.kind] = (acc[med.kind] || 0) + 1;
      return acc;
    }, {});

    const percentages = Object.entries(typeCount)
      .map(
        ([kind, count]) =>
          `${kind}: ${(((count as number) / total) * 100).toFixed(1)}%`,
      )
      .join(', ');

    return {
      totalMeds: total,
      percentagePerType: percentages,
      meds,
    };
  }
}
