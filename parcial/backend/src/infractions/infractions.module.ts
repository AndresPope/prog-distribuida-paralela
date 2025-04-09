import { Module } from '@nestjs/common';
import { InfractionsService } from './infractions.service';
import { InfractionsRepository } from './infractions.repository';
import { PrismaService } from '../prisma.service';
import { InfractionsResolver } from './infractions.resolvers';

@Module({
  providers: [
    InfractionsService,
    InfractionsRepository,
    PrismaService,
    InfractionsResolver,
  ],
})
export class InfractionsModule {}
