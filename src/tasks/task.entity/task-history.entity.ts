import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class TaskHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Task, (task) => task.history, { onDelete: 'CASCADE' })
  task: Task;

  @Column()
  action: string; // e.g. created, updated, statusChanged

  @Column({ type: 'json', nullable: true })
  changes: any;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}
