import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signIn(userName: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(userName);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }
}
