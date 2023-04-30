import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  name: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      name: 'Jane',
      password: 'mylifeMYRULEZ',
    },
    {
      userId: 2,
      name: 'Jamal',
      password: 'myNameJamal',
    },
  ];

  async findOne(name: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === name);
  }
}
