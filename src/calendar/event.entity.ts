import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Event {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  startDate: Date;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  endDate: Date;

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({ description: 'Event owner (user who created it)' })
  @ManyToOne(() => User, (user) => user.events, { onDelete: 'CASCADE' })
  user: User;
}
