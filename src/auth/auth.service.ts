import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string,) {
    return this.usersService.validateUser(email, password);
  }

  async login(loginUserDto: CreateUserDto) {
    const load = { email: loginUserDto.email, sub: loginUserDto.password };
    return {
      access_token: this.jwtService.sign(load),
    };
  }

  async signup(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}