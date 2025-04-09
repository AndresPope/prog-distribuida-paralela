import { Field, InputType } from '@nestjs/graphql';
import { OwnerType } from './owner.gql';

@InputType()
export class CreateOwnerInput {
  @Field()
  identification: string;
  @Field()
  name: string;
  @Field()
  address: string;
  @Field((type) => OwnerType)
  type: OwnerType;
}

@InputType()
export class UpdateOwnerInput extends CreateOwnerInput {
  @Field()
  id: string;
}
