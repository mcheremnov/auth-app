import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'import { throws } from 'assert';
;
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) { }

  async signIn(userName: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(userName);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.name, sub: user.id }
  }

  async compareHash(pass: string, email: string): Promise<bool> {
    //TODO Retrieve password hash from db


    //TODO Compare two hash and retrieve boolean


  }
}
