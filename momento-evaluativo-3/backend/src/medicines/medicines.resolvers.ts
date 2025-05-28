import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MedicinesGql } from './gql/medicines.gql';
import { MedicinesService } from './medicines.service';
import { GraphQLError } from 'graphql/error';
import { CreateMedicineGqlInput, UpdateMedicineInput } from './gql/inputs.gql';

@Resolver(() => MedicinesGql)
export class MedicinesResolvers {
  constructor(private readonly services: MedicinesService) {}

  @Query(() => [MedicinesGql])
  async listAllMedicines() {
    const medicines = await this.services.findAll();
    return medicines.map((med) => med.toJson());
  }

  @Mutation(() => MedicinesGql)
  async createMedicine(
    @Args('CreateMedicineInput') input: CreateMedicineGqlInput,
  ) {
    try {
      const medicine = await this.services.create(input);
      return medicine.toJson();
    } catch (e) {
      const err = e as Error;
      throw new GraphQLError(err.message);
    }
  }

  @Mutation(() => MedicinesGql)
  async updateMedicine(
    @Args('UpdateMedicineInput') input: UpdateMedicineInput,
  ) {
    try {
      const medicine = await this.services.update(input);
      return medicine.toJson();
    } catch (e) {
      const err = e as Error;
      throw new GraphQLError(err.message);
    }
  }

  @Mutation(() => MedicinesGql)
  async removeMedicine(@Args('id') id: number) {
    try {
      const response = await this.services.remove(id);
      return response.toJson();
    } catch (e) {
      const err = e as Error;
      throw new GraphQLError(err.message);
    }
  }
}
