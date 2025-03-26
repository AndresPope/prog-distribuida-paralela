import { Injectable } from '@nestjs/common';
import { CreateInfractionDto } from './dto/create-infraction.dto';
import { UpdateInfractionDto } from './dto/update-infraction.dto';
import { InfractionsRepository } from './infractions.repository';

@Injectable()
export class InfractionsService {
  constructor(private readonly repository: InfractionsRepository) {}

  create(createInfractionDto: CreateInfractionDto) {
    return this.repository.create(createInfractionDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} infraction`;
  }

  update(id: number, updateInfractionDto: UpdateInfractionDto) {
    return `This action updates a #${id} infraction`;
  }

  async remove(id: string) {
    const infractionExists = await this.repository.exists(id);

    if (!infractionExists) {
      throw new Error('La infracción no existe');
    }

    return this.repository.remove(id);
  }
}
