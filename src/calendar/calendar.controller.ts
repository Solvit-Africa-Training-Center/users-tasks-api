import { Controller, Get, Post, Patch, Delete, Param, Body, Req } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto, UpdateCalendarDto } from './calender.dto';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Calendar')
@Controller('calendar')
@UseGuards(AuthGuard('jwt'))
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Event successfully created' })
  create(@Body() dto: CreateCalendarDto, @Req() req: any) {
    return this.calendarService.create(dto, req.user.userId);
  }

  @Get()
  @ApiOkResponse({ description: 'List of calendar events' })
  findAll(@Req() req: any) {
    return this.calendarService.findAll(req.user.userId, req.user.role);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Single event details' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.calendarService.findOne(id, req.user.userId, req.user.role);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Event successfully updated' })
  update(@Param('id') id: string, @Body() dto: UpdateCalendarDto, @Req() req: any) {
    return this.calendarService.update(id, dto, req.user.userId, req.user.role);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Event successfully deleted' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.calendarService.remove(id, req.user.userId, req.user.role);
  }
}
