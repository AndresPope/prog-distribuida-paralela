import { Module } from '@nestjs/common';
import { InfractionsService } from './infractions.service';
import { InfractionsController } from './infractions.controller';
import { InfractionsRepository } from './infractions.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [InfractionsController],
  providers: [InfractionsService, InfractionsRepository, PrismaService],
})
export class InfractionsModule {}
