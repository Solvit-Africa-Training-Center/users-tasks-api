import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.entity/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ enum: TaskStatus })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}


//export class UpdateTaskDto {}
