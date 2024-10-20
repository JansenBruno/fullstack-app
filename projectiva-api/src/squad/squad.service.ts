import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SquadService {
  constructor(private prisma: PrismaService) {}

  async createSquad(name: string, managerId: number) {
    const manager = await this.prisma.user.findUnique({
      where: { id: managerId },
    });
    if (!manager) {
      throw new NotFoundException(`User with ID ${managerId} not found`);
    }

    return this.prisma.squad.create({
      data: {
        name: name,
        manager: {
          connect: { id: managerId },
        },
      },
    });
  }

  async updateSquad(id: string, name: string) {
    const squadId = parseInt(id, 10);
    const squad = await this.prisma.squad.findUnique({
      where: {
        id: squadId, 
      },
    });
    if (!squad) {
      throw new Error('Squad not found');
    }
    return this.prisma.squad.update({
      where: { id: squadId },
      data: { name },
    });
  }

  async deleteSquad(id: number) {
    const squad = await this.prisma.squad.findUnique({
      where: {
        id: id, 
      },
    });


    if (!squad) {
      throw new Error('Squad not found');
    }

    
    return this.prisma.squad.delete({
      where: {
        id: id, 
      },
    });
  }

  async getAllSquads() {
    return this.prisma.squad.findMany(); 
  }

  async getAllSquadsWithMembers() {
    return await this.prisma.squad.findMany({
      include: {
        members: {
          include: {
            user: true, 
          },
        },
      },
    });
  }

  async addMember(squadId: number, userId: number, role: string) {
    const squad = await this.prisma.squad.findUnique({
      where: { id: squadId },
    });

    if (!squad) {
      throw new Error('Squad não encontrado');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const validRoles = ['employee', 'manager'];
    if (!validRoles.includes(role)) {
      throw new Error('Role deve ser "employee" ou "manager"');
    }

    
    const userSquadLink = await this.prisma.userSquadLink.create({
      data: {
        user: {
          connect: { id: userId },
        },
        squad: {
          connect: { id: squadId },
        },
        role,
        
      },
    });

    return {
      message: 'Membro adicionado ao squad com sucesso',
      squad: {
        id: squad.id,
        name: squad.name,
      },
      member: {
        id: user.id,
        name: user.username,
        email: user.email,
        role: userSquadLink.role,
      },
    };
  }
}
