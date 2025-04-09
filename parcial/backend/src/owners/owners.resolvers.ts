import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OwnerGql } from './gql/owner.gql';
import { OwnersService } from './owners.service';
import { InfractionGql } from '../infractions/gql/infraction.gql';
import { VehicleGql } from 'src/vehicles/gql/vehicle.gql';
import { CreateOwnerInput, UpdateOwnerInput } from './gql/inputs.gql';
import { GraphQLError } from 'graphql/error';

@Resolver(() => OwnerGql)
export class OwnersResolver {
  constructor(private readonly services: OwnersService) {}

  @ResolveField()
  async vehicles(@Parent() owner: OwnerGql) {
    const { id } = owner;
    return this.services.getAllVehicles({ ownerId: id });
  }

  @ResolveField()
  async infractions(@Parent() owner: OwnerGql) {
    const { id } = owner;
    return this.services.getAllInfractions({ ownerId: id });
  }

  @Query(() => [OwnerGql])
  async listOwners() {
    const owners = await this.services.findAll();
    return owners.map((owner) => owner.toJson());
  }

  @Query(() => [InfractionGql])
  async listAllOwnerInfractions(@Args('ownerId') ownerId: string) {
    const infractions = await this.services.getAllInfractions({ ownerId });
    return infractions.map((infraction) => infraction.toJson());
  }

  @Query(() => [VehicleGql])
  async listAllOwnerVehicles(@Args('ownerId') ownerId: string) {
    const vehicles = await this.services.getAllVehicles({ ownerId });
    return vehicles.map((vehicle) => vehicle.toJson());
  }

  @Mutation(() => OwnerGql)
  async createOwner(@Args('OwnerInput') input: CreateOwnerInput) {
    try {
      const response = await this.services.create(input);
      return response.toJson();
    } catch (e) {
      const err = e as Error;
      throw new GraphQLError(err.message);
    }
  }

  @Mutation(() => OwnerGql)
  async updateOwner(@Args('OwnerUpdateInput') input: UpdateOwnerInput) {
    try {
      const response = await this.services.update(input);
      return response.toJson();
    } catch (e) {
      const err = e as Error;
      throw new GraphQLError(err.message);
    }
  }

  @Mutation(() => OwnerGql)
  async deleteOwner(@Args('id') id: string) {
    try {
      const owner = await this.services.remove(id);
      return owner.toJson();
    } catch (e) {
      const err = e as Error;
      throw new GraphQLError(err.message);
    }
  }
}
