import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/create-user.dto';
import { SignupUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string,) {
    return this.usersService.validateUser(email, password);
  }

  async login(loginUserDto: LoginUserDto) {
    const load = { email: loginUserDto.email, sub: loginUserDto.password };
    return {
      access_token: this.jwtService.sign(load),
    };
  }

  async signup(signupUserDto: SignupUserDto) {
    return this.usersService.createUser(signupUserDto);
  }
}