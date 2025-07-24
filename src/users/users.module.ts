import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthModule } from '..//auth/auth.module';
import { User } from './user.entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './user.entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService],
  exports: [UsersService, AuthModule],
})
export class UsersModule {}
