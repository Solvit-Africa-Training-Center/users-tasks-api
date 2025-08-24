import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class CreateCalendarDto {
  @ApiProperty({ description: 'Event title', example: 'Team Meeting' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Event description', example: 'Discuss project milestones' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Event start date/time', example: '2025-08-24T09:00:00Z' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ description: 'Event end date/time', example: '2025-08-24T10:30:00Z' })
  @IsDateString()
  endDate: Date;
}

export class UpdateCalendarDto extends PartialType(CreateCalendarDto) {}
