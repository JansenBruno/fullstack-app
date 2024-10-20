import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { SquadService } from './squad.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('squads')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SquadController {
  constructor(private readonly squadService: SquadService) {}

  @Post('create')
  @Roles('manager')
  async createSquad(@Body() data: { name: string }, @Request() req) {
    const managerId = req.user.id; 
    return this.squadService.createSquad(data.name, managerId);
  }

  @Get()
  async getAllSquads() {
    return this.squadService.getAllSquads();
  }

  @Get('all')
  async getAllSquadswithAllMembers() {
    return await this.squadService.getAllSquadsWithMembers();
  }


  @Put(':id')
  @Roles('manager')
  async updateSquad(@Param('id') id: string, @Body() data: { name: string }) {
    return this.squadService.updateSquad(id, data.name);
  }

  @Delete(':id')
  @Roles('manager')
  async deleteSquad(@Param('id') id: string) {
    return this.squadService.deleteSquad(parseInt(id, 10));
  }

  @Post(':squadId/members')
  @Roles('manager')
  async addMemberToSquad(
    @Param('squadId') squadId: string, 
    @Body() data: { userId: number; role: string },
  ) {
    const numericSquadId = parseInt(squadId, 10); 

    if (isNaN(numericSquadId)) {
      throw new BadRequestException('ID do squad inválido');
    }

    try {
      const result = await this.squadService.addMember(
        numericSquadId,
        data.userId,
        data.role,
      );
      return result;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Erro ao adicionar membro ao squad',
      );
    }
  }
}
