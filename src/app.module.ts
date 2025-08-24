import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity/user.entity';
import { Task } from './tasks/task.entity/task.entity';
import { Event } from './calendar/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotionModule } from './notion/notion.module';
import { CalendarModule } from './calendar/calendar.module';
import { CalendarEvent } from './calendar/calendar.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DEV_HOST,
      port: parseInt(process.env.DEV_PORT as string) || 5432,
      username: process.env.DEV_USERNAME,
      password: process.env.DEV_PASSWORD,
      database: process.env.DEV_DATABASE_NAME,
      entities: [User, Task, Event, CalendarEvent ],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
    AuthModule,
    AiModule,
    DashboardModule,
    NotionModule,
    CalendarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
