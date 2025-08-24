import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCalendarDto, UpdateCalendarDto } from './calender.dto';
import { User } from '../users/user.entity/user.entity';
import { Event } from './event.entity';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Event)
    private readonly calendarRepo: Repository<Event>,
  ) {}
  async create(dto: CreateCalendarDto, userId: string) {
    const event = this.calendarRepo.create({
      ...dto,
      user: { id: userId } as unknown as User,
    });
    return await this.calendarRepo.save(event);
  }

  async findAll(userId: string, role: string) {
    const where = role === 'admin' ? {} : { user: { id: userId } };
    return await this.calendarRepo.find({
      where,
      relations: ['user'],
      order: { startDate: 'ASC' as any },
    });
  }

  async findOne(id: string, userId: string, role: string) {
    const event = await this.calendarRepo.findOne({
      where: role === 'admin' ? { id } : { id, user: { id: userId } },

      relations: ['user'],
    });
    if (!event) throw new NotFoundException(`Event with ID ${id} not found`);
    return event;
  }

  async update(
    id: string,
    dto: UpdateCalendarDto,
    userId: string,
    role: string,
  ) {
    const event = await this.findOne(id, userId, role);
    Object.assign(event, dto);
    return this.calendarRepo.save(event);
  }

  async remove(id: string, userId: string, role: string) {
    const event = await this.findOne(id, userId, role);
    return await this.calendarRepo.remove(event);
  }
}
