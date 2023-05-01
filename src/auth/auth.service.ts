import { Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) { }

  async signIn(email: string, pass: string) {
    const user = await this.userService.findOne(email);
    if (user.passHash !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.name, sub: user.id }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  export const Public = () => SetMetadata(process.env.IS_PUBLIC, true);  
}

