import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookRepository } from "src/users/repositories/book.repository";
import { CreateBookDto } from "src/users/dto/create-book.dto";
import { UpdateBookDto } from "src/users/dto/update-book.dto";
import { Book } from "src/users/user.entity/book.entity";

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async findById(id: number): Promise<Book> {
    const book = await this.bookRepository.findById(id);
    if(!book) throw new NotFoundException('Book not found');
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
  const book = await this.bookRepository.createBook(createBookDto);
  return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    await this.bookRepository.updateBook(id, updateBookDto);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.bookRepository.deleteBook(id);
  }
}