import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/repositories/users.repository';
import { Role } from '../users/user.entity/role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const existing = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    let defaultRole = await this.roleRepository.findOne({ where: { name: 'user' } });

    if (!defaultRole) {
      defaultRole = this.roleRepository.create({ name: 'user' });
      await this.roleRepository.save(defaultRole);
    }

    const newUser = this.usersRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
      roles: [defaultRole],
    });

    const savedUser = await this.usersRepository.save(newUser);

    const { password, ...rest } = Array.isArray(savedUser) ? savedUser[0] : savedUser;

    return rest;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async getAllUsers() {
    return this.usersRepository.find({ relations: ['roles'] });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.usersRepository.update(id, updateUserDto);

    const updatedUser = await this.usersRepository.findById(id);
    return updatedUser;
  }

  async removeUser(id: number) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.usersRepository.delete(id);
  }

  async validateUser(email: string, password: string): Promise<Omit<any, 'password'> | null> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }
}