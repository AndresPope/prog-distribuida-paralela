import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InfractionGql } from './gql/infraction.gql';
import { InfractionsService } from './infractions.service';

import { CreateInfractionInput, UpdateInfractionInput } from './gql/inputs.gql';
import { GraphQLError } from 'graphql/error';

@Resolver(() => InfractionGql)
export class InfractionsResolver {
  constructor(private readonly services: InfractionsService) {}

  @ResolveField()
  async owner(@Parent() infraction: InfractionGql) {
    try {
      const { ownerId } = infraction;
      const owner = await this.services.getInfractionOwner(ownerId);
      return owner.toJson();
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  @ResolveField()
  async vehicle(@Parent() infraction: InfractionGql) {
    try {
      const { vehicleId } = infraction;
      const vehicle = await this.services.getInfractionVehicle(vehicleId);
      return vehicle.toJson();
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  @Query(() => [InfractionGql])
  async listAllInfractions() {
    const infractions = await this.services.findAll();
    return infractions.map((infraction) => infraction.toJson());
  }

  @Mutation(() => InfractionGql)
  async createInfraction(
    @Args('CreateInfractionInput') input: CreateInfractionInput,
  ) {
    try {
      const response = await this.services.create(input);
      return response.toJson();
    } catch (e) {
      const err = e as Error;
      throw new GraphQLError(err.message);
    }
  }

  @Mutation(() => InfractionGql)
  async updateInfraction(
    @Args('UpdateInfractionInput') input: UpdateInfractionInput,
  ) {
    try {
      const response = await this.services.update(input);
      return response.toJson();
    } catch (e) {
      const err = e as Error;
      throw new GraphQLError(err.message);
    }
  }

  @Mutation(() => InfractionGql)
  async removeInfraction(@Args('id') id: string) {
    try {
      const response = await this.services.remove(id);
      return response.toJson();
    } catch (e) {
      const err = e as Error;
      throw new GraphQLError(err.message);
    }
  }
}
