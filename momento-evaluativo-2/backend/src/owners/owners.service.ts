import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnersRepository } from './owners.repository';
import { OwnerType } from '@prisma/client';

@Injectable()
export class OwnersService {
  constructor(private readonly ownersRepository: OwnersRepository) {}

  async create(createOwnerDto: CreateOwnerDto) {
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

  findOne(id: number) {
    return `This action returns a #${id} owner`;
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} owner`;
  }

  async remove(id: string) {
    const ownerHasAssignedTickets =
      await this.ownersRepository.getAllInfractions(id);
    if (ownerHasAssignedTickets.length > 0) {
      throw new Error(
        `El propietario tiene multas asignadas no puede ser eliminado`,
      );
    }

    return this.ownersRepository.remove(id);
  }

  getAllVehicles(param: { ownerId: string }) {
    return this.ownersRepository.getAllVehicles(param.ownerId);
  }
}
