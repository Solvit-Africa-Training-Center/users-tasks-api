import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity/user.entity';
import {Task} from '../tasks/task.entity/task.entity'
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CalendarEvent {
  @ApiProperty({ description: 'Unique ID of the event' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Title of the event',
    example: 'Project deadline',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Detailed description of the event',
    example: 'Finish API module by this date',
  })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({
    description: 'Start date/time of the event',
    example: '2025-08-24T09:00:00Z',
  })
  @Column({ type: 'timestamp' })
  startDate: Date;

  @ApiProperty({
    description: 'End date/time of the event',
    example: '2025-08-24T17:00:00Z',
  })
  @Column({ type: 'timestamp' })
  endDate: Date;

  @ApiProperty({ description: 'Event owner (user who created it)' })
  @ManyToOne(() => User, (user) => user.events, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Task, (task) => task.calendarEvents, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  task: Task;

  
}
