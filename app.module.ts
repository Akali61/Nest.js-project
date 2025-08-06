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
      host: '172.17.0.2',
      port: 5432,
      username: 'postgres',
      password: 'postgres', 
      database: 'mydb',
      entities: [User, Role],
      synchronize: true, 
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule]
})
export class AppModule {}