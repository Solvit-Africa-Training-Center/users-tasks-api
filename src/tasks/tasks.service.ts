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
      status: dto.status ?? TaskStatus.PENDING,
      user,
    });
    return this.taskRepo.save(task);
  }

  async findAll(page = 1, limit = 10) {
    const take = Math.max(1, Math.min(100, limit));
    const skip = Math.max(0, (page - 1) * take);

    const [items, total] = await this.taskRepo.findAndCount({
      take,
      skip,
      order: {

      },
      relations: ['user'],
    });
    return { page, limit: take, total, items };
  }

  async findOne(id: string) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async updateStatus(id: string, dto: UpdateTaskDto, requesterUserId: string) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) throw new NotFoundException('Task not found');
    if (task.user.id !== requesterUserId)
      throw new ForbiddenException('Not your task');

    task.status = dto.status;
    return this.taskRepo.save(task);
  }

  async remove(id: string, requesterUserId: string) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) throw new NotFoundException('Task not found');
    if (task.user.id !== requesterUserId)
      throw new ForbiddenException('Not your task');

    await this.taskRepo.delete(id);
    return { deleted: true };
  }
}
