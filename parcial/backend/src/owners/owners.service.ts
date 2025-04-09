import { Injectable } from '@nestjs/common';
import { CreateOwnerInput, UpdateOwnerInput } from './gql/inputs.gql';
import { OwnersRepository } from './owners.repository';
import { OwnerType } from './gql/owner.gql';

@Injectable()
export class OwnersService {
  constructor(private readonly ownersRepository: OwnersRepository) {}

  async create(createOwnerDto: CreateOwnerInput) {
    if (!Object.values(OwnerType).includes(createOwnerDto.type)) {
      throw new Error(
        `El tipo de propietario ${createOwnerDto.type} no es valido`,
      );
    }

    const ownerAlreadyExists = await this.ownersRepository.ownerExists(
      createOwnerDto.identification,
    );
    if (ownerAlreadyExists) {
      throw new Error(
        `El propietario con identificacion ${createOwnerDto.identification} ya existe`,
      );
    }

    return this.ownersRepository.create(createOwnerDto);
  }

  findAll() {
    return this.ownersRepository.findAll();
  }

  getAllInfractions({ ownerId }: { ownerId: string }) {
    return this.ownersRepository.getAllInfractions(ownerId);
  }

  async update(updateOwner: UpdateOwnerInput) {
    if (!Object.values(OwnerType).includes(updateOwner.type)) {
      throw new Error(
        `El tipo de propietario ${updateOwner.type} no es valido`,
      );
    }

    const ownerAlreadyExists = await this.ownersRepository.ownerExistsId(
      updateOwner.id,
    );

    if (!ownerAlreadyExists) {
      throw new Error(
        `El propietario con identificacion ${updateOwner.identification} no existe`,
      );
    }

    return this.ownersRepository.update(updateOwner);
  }

  async remove(id: string) {
    const ownerHasAssignedTickets =
      await this.ownersRepository.getAllInfractions(id);
    if (ownerHasAssignedTickets.length > 0) {
      throw new Error(
        `El propietario tiene multas asignadas no puede ser eliminado`,
      );
    }

    const ownerExists = await this.ownersRepository.ownerExistsId(id);

    if (!ownerExists) {
      throw new Error(`El propietario con id ${id} no existe`);
    }

    return this.ownersRepository.remove(id);
  }

  getAllVehicles(param: { ownerId: string }) {
    return this.ownersRepository.getAllVehicles(param.ownerId);
  }
}
