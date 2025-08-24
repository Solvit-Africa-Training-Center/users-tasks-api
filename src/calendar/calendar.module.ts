import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity'; 
import { CalendarEvent } from './calendar.entity';

@Module({
   imports: [
    TypeOrmModule.forFeature([Event, CalendarEvent]) ],
  providers: [CalendarService],
  controllers: [CalendarController]
})
export class CalendarModule {}
