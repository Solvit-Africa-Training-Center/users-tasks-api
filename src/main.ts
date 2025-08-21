import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Seed admin user if not exists
  const userRepo = app.get('UserRepository') as any;
  const admin = await userRepo.findOne({
    where: { email: 'admin@example.com' },
  });
  if (!admin) {
    await userRepo.save({
      id: '5f1c9e3a-22e2-4b0b-9f62-7c4f4e1e8a4d',
      name: 'Admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    });
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Users & Tasks API')
    .setDescription('NestJS + TypeORM + JWT example')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(process.env.PORT as string, 10) || 3000);
}
bootstrap();
