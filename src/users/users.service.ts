import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entities';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>,) { }

  async findOne(email: string): Promise<User | void> {
    return await this.userRepo.findOne({ where: [{ email: email }] })
      .catch(err => console.error('Error finding user with email %s /n Error msg: %s', email, err));
  }

  async createUser(user: User): Promise<User> {
    return this.userRepo.create(user);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const dbUser = await this.userRepo.findOneById(id);
    if (dbUser) {
      return await this.userRepo.update(id, user);
    }
    return new Error("Failed to find user with id %s", id);
  }

  async deleteUser(id: number): bool {
    const result = await this.userRepo.delete(id);
    if (result) {
      return true;
    }
    return false;
  }
}
