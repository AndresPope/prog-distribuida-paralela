import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesRepository } from './vehicles.repository';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const vehicleAlreadyExists = await this.vehiclesRepository.vehicleExists(
      createVehicleDto.plate,
    );

    if (vehicleAlreadyExists) {
      throw new Error(
        `El Vehiculo con placa ${createVehicleDto.plate} ya tiene un propietario`,
      );
    }

    return this.vehiclesRepository.create(createVehicleDto);
  }

  findAll() {
    return this.vehiclesRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  async remove(id: string) {
    const vehicleExists = await this.vehiclesRepository.vehicleIdExists(id);
    if (!vehicleExists) {
      throw new Error(`El vehiculo con placa ${id} no existe`);
    }
    const hasInfractions = await this.vehiclesRepository.hasInfractions(id);
    if (hasInfractions) {
      throw new Error(`El vehiculo tiene infracciones asignadas`);
    }
    return this.vehiclesRepository.remove(id);
  }
}
