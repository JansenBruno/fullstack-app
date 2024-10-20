import { Module } from '@nestjs/common';
import { SquadController } from './squad.controller';
import { SquadService } from './squad.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [SquadController],
  providers: [SquadService],
})
export class SquadModule {}
