import {
  BeforeInsert,
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Task } from '../../tasks/task.entity/task.entity';
import { CalendarEvent } from '../../calendar/calendar.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }

  @Column({ default: 'user' })
  role: 'user' | 'admin';

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks: Task[];

    @OneToMany(() => CalendarEvent, (event) => event.user) // ✅ now correct
  events: CalendarEvent[];
}

export class UserEntity {}
