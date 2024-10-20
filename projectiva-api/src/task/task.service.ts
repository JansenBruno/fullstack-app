import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(
    description: string,
    userId: number,
    squadId: number
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        description,
        userId: userId, 
        squadId: squadId, 
      } as any, 
    });
  }

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  
  async getTaskById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return task;
  }

 
  async updateTask(
    id: number,
    description?: string,
    userId?: number
  ): Promise<Task> {
    const taskExists = await this.prisma.task.findUnique({ where: { id } });
    if (!taskExists) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }


    const data: Partial<Task> = {
      ...(description !== undefined && { description }),
      ...(userId !== undefined && { userId }),
    };

    return this.prisma.task.update({
      where: { id },
      data,
    });
  }


  async deleteTask(id: number): Promise<Task> {
    const taskExists = await this.prisma.task.findUnique({ where: { id } });
    if (!taskExists) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }

    return this.prisma.task.delete({
      where: { id },
    });
  }

 
  async getTasksByUser(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async getTasksBySquad(squadId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { squadId },
    });
  }


  async getTasksByUserAndSquad(
    userId: number,
    squadId: number,
  ): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
        squadId,
      },
    });
  }
}
