import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { OwnersModule } from './owners/owners.module';
import { InfractionsModule } from './infractions/infractions.module';

@Module({
  imports: [VehiclesModule, OwnersModule, InfractionsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
