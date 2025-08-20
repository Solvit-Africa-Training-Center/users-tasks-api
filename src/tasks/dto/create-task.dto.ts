import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { TaskStatus } from '../task.entity/task.entity';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  
  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: TaskStatus })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({ description: 'Owner user id (UUID)' })
  @IsUUID()
  userId: string;
}


//export class CreateTaskDto {}
