import { Body, Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto, @Req() req: Request) {
    const user = await this.authService.signup(dto);
    req.session.userId = user.id;
    return user;
  }

  @Post('login')
  async login(@Body() dto: CreateUserDto, @Req() req: Request) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Incorrect credentials');
    }
    req.session.userId = user.id;
    return user;
  }
}
