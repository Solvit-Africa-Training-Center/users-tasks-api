import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity/user.entity';
import { Task } from './tasks/task.entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


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
      entities: [User, Task],
      autoLoadEntities: true,
      synchronize: true, 
    }),UsersModule, TasksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
