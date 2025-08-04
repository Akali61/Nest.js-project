import { Body, Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Request } from 'express';
import { Session } from 'inspector/promises';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    const user = await this.authService.signup(createUserDto);
    req.session.userId = user.id;
    return user;
  }

  @Post('/login')
  async login(@Body() loginUserDto: CreateUserDto, @Req() req: Request) {
    const user = await this.authService.validateUser( loginUserDto.email, loginUserDto.password);
    if (!user) {
      throw new UnauthorizedException('Incorrect credentials');
    }
    req.session.userId = user.id;
    return user;
  }
}
