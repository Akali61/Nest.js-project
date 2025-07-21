import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity/user.entity';
import { Role } from './user.entity/role.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existing = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    let defaultRole = await this.roleRepository.findOne({ where: { name: 'user' } });

    if (!defaultRole) {
      defaultRole = this.roleRepository.create({ name: 'user' });
      await this.roleRepository.save(defaultRole);
    }

    const newUser = this.userRepository.create({
      email: dto.email,
      password: hashedPassword,
      roles: [defaultRole],
    });

  const savedUser = await this.userRepository.save(newUser);

  if (Array.isArray(savedUser)) {
    const user = savedUser[0];
    const { password, ...rest } = user;
    return rest;
  } else {
    const { password, ...rest } = savedUser;
    return rest;
  }
  }

  async findByEmail(email: string): Promise<User | any> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['roles'], 
    });
  }

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.findByEmail(email);
    if (!user) 
      return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
