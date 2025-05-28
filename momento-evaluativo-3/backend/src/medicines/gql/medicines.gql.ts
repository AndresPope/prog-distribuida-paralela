import {
  Field,
  ObjectType,
  GraphQLISODateTime,
  registerEnumType,
} from '@nestjs/graphql';

export enum MedicineType {
  TABLETA = 'TABLETA',
  JARABE = 'JARABE',
  POLVO = 'POLVO',
  GOTAS = 'GOTAS',
}

registerEnumType(MedicineType, {
  name: 'MedicineType',
});

@ObjectType()
export class MedicinesGql {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field((type) => MedicineType)
  kind: MedicineType;

  @Field()
  laboratory: string;

  @Field()
  quantity: number;

  @Field((type) => GraphQLISODateTime)
  expirationDate: Date;

  @Field((type) => GraphQLISODateTime)
  registrationDate: Date;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;
}
