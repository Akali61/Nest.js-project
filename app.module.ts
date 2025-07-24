import { Module } from '@nestjs/common';
import { AuthModule } from './src/auth/auth.module';
import { UsersModule } from './src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './src/users/user.entity/user.entity';
import { Role } from './src/users/user.entity/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3000,
      username: 'postgres',
      password: 'postgres', 
      database: 'mydb',
      entities: [User, Role],
      synchronize: true, 
    }),
    AuthModule,
    UsersModule]
})
export class AppModule {}