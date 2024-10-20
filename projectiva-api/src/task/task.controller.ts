import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt')) 
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  
  @Post()
  async createTask(@Body() body: { description: string; squadId: number; status: string }, @Request() req) {
    const userId = req.user.id; 
    return this.taskService.createTask(body.description, userId, body.squadId);
  }
  

 
  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

 
  @Get(':id')
  async getTaskById(@Param('id') id: string) { 
    return this.taskService.getTaskById(parseInt(id, 10));
  }

  
  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() body: { description: string }) {
    return this.taskService.updateTask(parseInt(id, 10), body.description); 
  }


  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(parseInt(id, 10)); 
  }
}
