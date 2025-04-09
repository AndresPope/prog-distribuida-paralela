import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { PrismaService } from '../prisma.service';
import { VehiclesRepository } from './vehicles.repository';
import { VehicleResolvers } from './vehicle.resolvers';

@Module({
  providers: [
    VehiclesService,
    VehiclesRepository,
    PrismaService,
    VehicleResolvers,
  ],
})
export class VehiclesModule {}
