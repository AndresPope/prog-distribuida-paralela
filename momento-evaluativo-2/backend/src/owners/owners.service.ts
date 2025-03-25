import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnersRepository } from './owners.repository';

@Injectable()
export class OwnersService {
  constructor(private readonly ownersRepository: OwnersRepository) {}

  create(createOwnerDto: CreateOwnerDto) {
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

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
