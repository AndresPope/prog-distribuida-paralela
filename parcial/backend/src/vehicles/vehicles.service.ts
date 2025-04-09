import { Injectable } from '@nestjs/common';
import { VehiclesRepository } from './vehicles.repository';
import { CreateVehicleInput, UpdateVehicleInput } from './gql/inputs.gql';
import { VehicleType } from './gql/vehicle.gql';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async create(createVehicleDto: CreateVehicleInput) {
    const vehicleAlreadyExists = await this.vehiclesRepository.vehicleExists(
      createVehicleDto.plate,
    );

    if (vehicleAlreadyExists) {
      throw new Error(
        `El Vehiculo con placa ${createVehicleDto.plate} ya tiene un propietario`,
      );
    }

    if (!Object.values(VehicleType).includes(createVehicleDto.type)) {
      throw new Error(
        `El tipo de vehiculo ${createVehicleDto.type} no es valido`,
      );
    }

    return this.vehiclesRepository.create(createVehicleDto);
  }

  findAll() {
    return this.vehiclesRepository.findAll();
  }

  async update(updateInput: UpdateVehicleInput) {
    const vehicleAlreadyExists = await this.vehiclesRepository.vehicleExists(
      updateInput.plate,
    );

    if (!vehicleAlreadyExists) {
      throw new Error(`El Vehiculo con placa ${updateInput.plate} no existe`);
    }

    if (!Object.values(VehicleType).includes(updateInput.type)) {
      throw new Error(`El tipo de vehiculo ${updateInput.type} no es valido`);
    }

    return this.vehiclesRepository.update(updateInput);
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

  getAllVehicleInfractions(id: string) {
    return this.vehiclesRepository.getAllVehicleInfractions(id);
  }

  async getVehicleOwner(ownerId: string) {
    return this.vehiclesRepository.getVehicleOwner(ownerId);
  }
}
