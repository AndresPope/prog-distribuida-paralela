import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { PrismaService } from '../prisma.service';
import { VehiclesRepository } from './vehicles.repository';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService, VehiclesRepository, PrismaService],
})
export class VehiclesModule {}
