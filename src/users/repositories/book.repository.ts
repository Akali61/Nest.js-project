import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../user.entity/book.entity';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly repo: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Book | any> {
    return this.repo.findOne({ where: { id } });
  }

  async createBook(data: Partial<Book>): Promise<Book> {
    const book = this.repo.create(data);
    return this.repo.save(book);
  }

  async updateBook(id: number, data: Partial<Book>): Promise<Book> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async deleteBook(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}