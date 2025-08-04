import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { User } from './user.entity/user.entity';
import { Role } from './user.entity/role.entity';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/users.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User).extend({
        async findByEmail(email: string) {
          return this.findOne({ where: { email }, relations: ['roles'] });
        }
      }),
      inject: [getDataSourceToken()],
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}