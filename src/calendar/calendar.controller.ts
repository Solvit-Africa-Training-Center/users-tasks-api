import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto, UpdateCalendarDto } from './calender.dto';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth,ApiUnauthorizedResponse,ApiNotFoundResponse, } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Calendar')
@ApiBearerAuth()
@Controller('calendar')
@UseGuards(AuthGuard('jwt'))
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Event successfully created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(@Body() dto: CreateCalendarDto, @Req() req: any) {
    return this.calendarService.create(dto, req.user.userId);
  }

  @Get()
  @ApiOkResponse({ description: 'List of calendar events' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findAll(@Req() req: any) {
    return this.calendarService.findAll(req.user.userId, req.user.role);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Single event details' })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.calendarService.findOne(id, req.user.userId, req.user.role);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Event successfully updated' })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCalendarDto,
    @Req() req: any,
  ) {
    return this.calendarService.update(id, dto, req.user.userId, req.user.role);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Event successfully deleted' })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.calendarService.remove(id, req.user.userId, req.user.role);
  }
}
