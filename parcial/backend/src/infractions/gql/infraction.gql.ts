import {
  Field,
  GraphQLISODateTime,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { VehicleGql } from '../../vehicles/gql/vehicle.gql';
import { OwnerGql } from '../../owners/gql/owner.gql';

export enum DetectionType {
  AGENT = 'AGENT',
  CAMERA = 'CAMERA',
}

registerEnumType(DetectionType, {
  name: 'DetectionType',
});

@ObjectType()
export class InfractionGql {
  @Field()
  id: string;

  @Field()
  ownerId: string;

  @Field()
  vehicleId: string;

  @Field((type) => GraphQLISODateTime)
  date: Date;

  @Field((type) => DetectionType)
  detectionType: DetectionType;

  @Field((type) => VehicleGql)
  vehicle: VehicleGql;

  @Field((type) => OwnerGql)
  owner: OwnerGql;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;
}
