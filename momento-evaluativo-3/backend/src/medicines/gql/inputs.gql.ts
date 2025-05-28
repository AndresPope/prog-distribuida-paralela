import { MedicineType } from './medicines.gql';
import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMedicineGqlInput {
  @Field()
  name: string;

  @Field()
  kind: MedicineType;
  @Field()
  laboratory: string;

  @Field()
  quantity: number;

  @Field((type) => GraphQLISODateTime)
  expirationDate: Date;
}

@InputType()
export class UpdateMedicineInput extends CreateMedicineGqlInput {
  @Field()
  id: number;
}
