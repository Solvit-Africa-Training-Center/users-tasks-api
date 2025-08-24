import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../tasks/task.entity/task.entity';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../tasks/dto/update-task.dto';
import { User } from '../users/user.entity/user.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateTaskDto, userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const task = this.taskRepo.create({
      title: dto.title,
      description: dto.description ?? undefined,
      priority: dto.priority ?? undefined,
      category: dto.category ?? undefined,
      dueDate: dto.dueDate ?? undefined,
      recurrence: dto.recurrence ?? undefined,
      status: dto.status ?? TaskStatus.PENDING,
      user,
    });

    return this.taskRepo.save(task);
  }

  // async findAll(page = 1, limit = 10, requesterUserId: string, role: string) {
  //   const take = Math.max(1, Math.min(100, limit));
  //   const skip = Math.max(0, (page - 1) * take);

  //   const where = role === 'admin' ? {} : { user: { id: requesterUserId } };

  //   const [items, total] = await this.taskRepo.findAndCount({
  //     take,
  //     skip,
  //     where,
  //     order: { dueDate: 'ASC', priority: 'DESC' },
  //     relations: ['user'],
  //   });

  //   return { page, limit: take, total, items };
  // }

  // tasks.service.ts
  async findAll(
    paginationDto: PaginationDto,
    requesterUserId: string,
    role: string,
  ) {
    const { page = 1, limit = 10 } = paginationDto;

    const take = Math.max(1, Math.min(100, limit));
    const skip = Math.max(0, (page - 1) * take);

    const where = role === 'admin' ? {} : { user: { id: requesterUserId } };

    const [items, total] = await this.taskRepo.findAndCount({
      take,
      skip,
      where,
      order: { dueDate: 'ASC', priority: 'DESC' },
      relations: ['user'],
    });

    return { page, limit: take, total, items };
  }

  async findOne(id: string, requesterUserId: string, role: string) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) throw new NotFoundException('Task not found');

    if (task.user.id !== requesterUserId && role !== 'admin') {
      throw new ForbiddenException('Not allowed to view this task');
    }

    return task;
  }

  async updateStatus(
    id: string,
    dto: UpdateTaskDto,
    requesterUserId: string,
    role: string,
  ) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) throw new NotFoundException('Task not found');

    if (task.user.id !== requesterUserId && role !== 'admin') {
      throw new ForbiddenException('Not allowed to update this task');
    }

    if (dto.status) {
      task.status = dto.status;
    }
    return this.taskRepo.save(task);
  }

  async remove(id: string, requesterUserId: string, role: string) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) throw new NotFoundException('Task not found');

    if (task.user.id !== requesterUserId && role !== 'admin') {
      throw new ForbiddenException('Not allowed to delete this task');
    }

    await this.taskRepo.delete(id);
    return { deleted: true };
  }
}
