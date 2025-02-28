import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user//user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userService.findByUsernameAndPassword(
      name,
      password,
    );
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.id };
    //subにユーザーIDを入れるのが一般的。sub はトークンの所有者（通常はユーザー）を一意に識別するための
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
