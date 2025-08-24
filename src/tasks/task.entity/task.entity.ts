import {Entity,BeforeInsert,PrimaryColumn,Column,ManyToOne} from 'typeorm';
import { User } from '../../users/user.entity/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity()
export class Task {
  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Column({ nullable: true })
  category?: string;

  @Column({ type: 'timestamp', nullable: true })
  dueDate?: Date;

  @Column({ nullable: true })
  recurrence?: string;

  @ApiProperty({ enum: TaskStatus, default: TaskStatus.PENDING })
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;
}

//export class TaskEntity { }
