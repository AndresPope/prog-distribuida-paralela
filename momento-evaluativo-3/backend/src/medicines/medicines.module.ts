import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { PrismaService } from '../prisma.service';
import { MedicinesRepository } from './medicines.repository';
import { MedicinesResolvers } from './medicines.resolvers';

@Module({
  providers: [
    MedicinesService,
    MedicinesRepository,
    PrismaService,
    MedicinesResolvers,
  ],
})
export class MedicinesModule {}
