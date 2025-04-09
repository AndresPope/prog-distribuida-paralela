import { VehicleType } from './vehicle.gql';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVehicleInput {
  @Field()
  plate: string;
  @Field()
  brand: string;
  @Field()
  type: VehicleType;
  @Field()
  ownerId: string;
}

@InputType()
export class UpdateVehicleInput extends CreateVehicleInput {
  @Field()
  id: string;
}
