import { Module } from '@nestjs/common';
import { BookController } from './books.controller';
import { BookService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/users/user.entity/book.entity';
import { BookRepository } from 'src/users/repositories/book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookRepository])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}