import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { PrismaService } from '../prisma.service';
import { OwnersRepository } from './owners.repository';
import { OwnersResolver } from './owners.resolvers';

@Module({
  providers: [OwnersService, OwnersRepository, PrismaService, OwnersResolver],
})
export class OwnersModule {}
