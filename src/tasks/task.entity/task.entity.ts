import {
  Entity,
  BeforeInsert,
  PrimaryColumn,
  Column,
  ManyToOne,OneToMany, ManyToMany, JoinTable,CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/user.entity/user.entity';
import { CalendarEvent } from '../../calendar/calendar.entity'
import {TaskHistory} from '../../tasks/task.entity/task-history.entity'
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

  @ManyToOne(() => Task, (task) => task.subtasks, { nullable: true })
parentTask: Task;

  @OneToMany(() => Task, (task) => task.parentTask)
  subtasks: Task[];

  @ManyToMany(() => Task)
  @JoinTable()
  dependencies: Task[];

  @OneToMany(() => CalendarEvent, (event) => event.task)
  calendarEvents: CalendarEvent[];

   @OneToMany(() => TaskHistory, (history) => history.task)
  history: TaskHistory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}

//export class TaskEntity { }
