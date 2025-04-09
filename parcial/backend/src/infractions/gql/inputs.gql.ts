import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { DetectionType } from './infraction.gql';

@InputType()
export class CreateInfractionInput {
  @Field()
  detectionType: DetectionType;
  @Field()
  vehicleId: string;
  @Field()
  ownerId: string;
  @Field((type) => GraphQLISODateTime)
  date: Date;
}

@InputType()
export class UpdateInfractionInput extends CreateInfractionInput {
  @Field()
  id: string;
}
