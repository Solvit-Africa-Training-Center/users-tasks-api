import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(dto: CreateUserDto) {
    const user = this.userRepo.create({
      name: dto.name,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
    });
    const saved = await this.userRepo.save(user);
    const { password, ...safe } = saved;
    return safe;
  }

  async findAll() {
    const users = await this.userRepo.find({ relations: ['tasks'] });
    return users.map(({ password, ...user }) => user);
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...safe } = user;
    return safe;
  }

  async remove(id: string) {
    const exists = await this.userRepo.findOne({ where: { id } });
    if (!exists) throw new NotFoundException('User not found');
    await this.userRepo.delete(id);
    return { deleted: true };
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
}
