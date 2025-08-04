import { Repository } from 'typeorm';
import { User } from '../user.entity/user.entity';

export class UsersRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email }, relations: ['roles'] });
  }

  async findById(id: number): Promise<User | null> {
    return this.findOne({ where: { id }, relations: ['roles'] });
  }

  async findAll(): Promise<User[]> {
    return this.find({ relations: ['roles'] });
  }

  async deleteById(id: number): Promise<void> {
    await this.delete(id);
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    await this.update(id, updateData);
    return this.findById(id) as Promise<User>;
  }
}