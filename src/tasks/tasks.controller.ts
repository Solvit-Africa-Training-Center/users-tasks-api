import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('tasks')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOkResponse({ description: 'Task successfully created' })
  @ApiBody({
    description: 'Create a new task',
    type: CreateTaskDto,
    examples: {
      default: {
        summary: 'Example payload',
        value: {
          title: 'Fix bug in authentication',
          description: 'Resolve token expiration issue in login flow',
          dueDate: '2025-09-01T12:00:00.000Z',
          priority: 'high',
        },
      },
    },
  })
  create(@Body() dto: CreateTaskDto, @Req() req: any) {
    return this.tasksService.create(dto, req.user.userId);
  }

  @Get()
  @ApiOkResponse({ description: 'Paginated list of tasks' })
  findAll(@Query() paginationDto: PaginationDto, @Req() req: any) {
    return this.tasksService.findAll(
      paginationDto,
      req.user.userId,
      req.user.role,
    );
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get a single task by ID' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.findOne(id, req.user.userId, req.user.role);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Task status successfully updated' })
  @ApiBody({
    description: 'Update task status or details',
    type: UpdateTaskDto,
    examples: {
      statusUpdate: {
        summary: 'Update task status',
        value: {
          status: 'completed',
        },
      },
      fullUpdate: {
        summary: 'Update multiple fields',
        value: {
          title: 'Updated task title',
          description: 'Refined task description',
          status: 'in-progress',
          priority: 'medium',
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Req() req: any) {
    return this.tasksService.updateStatus(
      id,
      dto,
      req.user.userId,
      req.user.role,
    );
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Task successfully deleted' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.remove(id, req.user.userId, req.user.role);
  }
}
