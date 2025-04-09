import {
  Field,
  GraphQLISODateTime,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { VehicleGql } from '../../vehicles/gql/vehicle.gql';
import { InfractionGql } from '../../infractions/gql/infraction.gql';

export enum OwnerType {
  PERSON = 'PERSON',
  COMPANY = 'COMPANY',
}

registerEnumType(OwnerType, {
  name: 'OwnerType',
});

@ObjectType()
export class OwnerGql {
  @Field()
  id: string;

  @Field()
  identification: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field((type) => OwnerType)
  type: OwnerType;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;

  @Field((type) => [VehicleGql])
  vehicles: VehicleGql[];

  @Field((type) => [InfractionGql])
  infractions: InfractionGql[];
}
