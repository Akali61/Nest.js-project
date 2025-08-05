import {
  Controller,
  Get, 
  Post, 
  Patch, 
  Delete, 
  Param, 
  Body, 
  UseGuards, 
  ParseIntPipe
} from '@nestjs/common';
import { BookService } from '../books/books.service';
import { CreateBookDto } from '../users/dto/create-book.dto';
import { UpdateBookDto } from '../users/dto/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Roles('user', 'admin')
  @Get()
  getAll() {
    return this.bookService.findAll();
  }

  @Roles('user', 'admin')
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findById(id);
  }

  @Roles('admin')
  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Roles('admin')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
    return this.bookService.update(id, dto);
  }

  @Roles('admin')
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.delete(id);
  }
}