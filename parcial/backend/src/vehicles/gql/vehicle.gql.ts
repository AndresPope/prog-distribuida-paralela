import {
  Field,
  ObjectType,
  GraphQLISODateTime,
  registerEnumType,
} from '@nestjs/graphql';
import { InfractionGql } from '../../infractions/gql/infraction.gql';
import { OwnerGql } from '../../owners/gql/owner.gql';

export enum VehicleType {
  CAR = 'CAR',
  BIKE = 'BIKE',
  HEAVY_CAR = 'HEAVY_CAR',
}

registerEnumType(VehicleType, {
  name: 'VehicleType',
});

@ObjectType()
export class VehicleGql {
  @Field()
  id: string;

  @Field()
  ownerId: string;

  @Field()
  plate: string;

  @Field()
  brand: string;

  @Field((type) => GraphQLISODateTime)
  registrationDate: Date;

  @Field((type) => VehicleType)
  type: VehicleType;

  @Field((type) => [InfractionGql])
  infractions: InfractionGql[];

  @Field((type) => [OwnerGql])
  owner: OwnerGql;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;
}
