import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { VehicleGql } from './gql/vehicle.gql';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleInput, UpdateVehicleInput } from './gql/inputs.gql';
import { GraphQLError } from 'graphql/error';

@Resolver(() => VehicleGql)
export class VehicleResolvers {
  constructor(private readonly services: VehiclesService) {}

  @ResolveField()
  async infractions(@Parent() vehicle: VehicleGql) {
    const { id } = vehicle;
    const infractions = await this.services.getAllVehicleInfractions(id);
    return infractions.map((infraction) => infraction.toJson());
  }

  @ResolveField()
  async owner(@Parent() vehicle: VehicleGql) {
    const { ownerId } = vehicle;
    const owner = await this.services.getVehicleOwner(ownerId);
    return owner.toJson();
  }

  @Query(() => [VehicleGql])
  async listAllVehicles() {
    const vehicles = await this.services.findAll();
    return vehicles.map((vehicle) => vehicle.toJson());
  }

  @Mutation(() => VehicleGql)
  async createVehicle(@Args('CreateVehicleInput') input: CreateVehicleInput) {
    try {
      const vehicle = await this.services.create(input);
      return vehicle.toJson();
    } catch (e) {
      const err = e as Error;
      throw new GraphQLError(err.message);
    }
  }

  @Mutation(() => VehicleGql)
  async updateVehicle(@Args('UpdateVehicleInput') input: UpdateVehicleInput) {
    try {
      const vehicle = await this.services.update(input);
      return vehicle.toJson();
    } catch (e) {
      const err = e as Error;
      throw new GraphQLError(err.message);
    }
  }

  @Mutation(() => VehicleGql)
  async removeVehicle(@Args('id') id: string) {
    try {
      const response = await this.services.remove(id);
      return response.toJson();
    } catch (e) {
      const err = e as Error;
      throw new GraphQLError(err.message);
    }
  }
}
