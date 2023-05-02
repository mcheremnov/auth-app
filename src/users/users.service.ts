import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entities';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>,) { }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(email: string): Promise<User | void> {
    return await this.userRepo.findOne({ where: [{ email: email }] })
      .catch(err => console.error('Error finding user with email %s /n Error msg: %s', email, err));
  }

  async createUser(user: User): Promise<User> {
    return this.userRepo.create(user);
  }

  async updateUser(id: number, user: Partial<User>) {
    return await this.userRepo.update(id, user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await this.userRepo.delete(id);
    if (result) {
      return true;
    }
    return false;
  }
}
