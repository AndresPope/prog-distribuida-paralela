import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { PrismaService } from '../prisma.service';
import {
  OwnersRepository,
  OwnersRepositoryProvider,
} from './owners.repository';

@Module({
  controllers: [OwnersController],
  providers: [OwnersService, OwnersRepository, PrismaService],
})
export class OwnersModule {}
