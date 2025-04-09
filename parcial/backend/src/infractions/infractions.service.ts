import { Injectable } from '@nestjs/common';
import { InfractionsRepository } from './infractions.repository';
import { DetectionType } from './gql/infraction.gql';
import { CreateInfractionInput, UpdateInfractionInput } from './gql/inputs.gql';

@Injectable()
export class InfractionsService {
  constructor(private readonly repository: InfractionsRepository) {}

  create(createInfractionInput: CreateInfractionInput) {
    const infractionDate = new Date(createInfractionInput.date);
    const currentDate = new Date();
    if (infractionDate > currentDate) {
      throw new Error(
        'La fecha de la infracción no puede ser mayor a la actual',
      );
    }

    if (
      !Object.keys(DetectionType).includes(createInfractionInput.detectionType)
    ) {
      throw new Error(
        `El tipo de infracción ${createInfractionInput.detectionType} no es valido`,
      );
    }

    return this.repository.create(createInfractionInput);
  }

  findAll() {
    return this.repository.findAll();
  }

  async update(updateInput: UpdateInfractionInput) {
    const infractionDate = new Date(updateInput.date);
    const currentDate = new Date();
    if (infractionDate > currentDate) {
      throw new Error(
        'La fecha de la infracción no puede ser mayor a la actual',
      );
    }

    if (!Object.keys(DetectionType).includes(updateInput.detectionType)) {
      throw new Error(
        `El tipo de infracción ${updateInput.detectionType} no es valido`,
      );
    }

    const infractionExists = await this.repository.exists(updateInput.id);

    if (!infractionExists) {
      throw new Error('La infracción no existe');
    }

    return this.repository.update(updateInput);
  }

  async remove(id: string) {
    const infractionExists = await this.repository.exists(id);

    if (!infractionExists) {
      throw new Error('La infracción no existe');
    }

    return this.repository.remove(id);
  }

  async getInfractionOwner(ownerId: string) {
    return this.repository.getInfractionOwner(ownerId);
  }

  async getInfractionVehicle(vehicleId: string) {
    return this.repository.getInfractionVehicle(vehicleId);
  }
}
