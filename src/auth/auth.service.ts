import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
    } catch (error: any) {}
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        return {
          error: 'User not found',
        };
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return {
          error: 'Invalid credentials',
        };
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async getToken(id: string, email: string, name: string, phone: string) {
    const payload = { id, email, name, phone, role: 'User' };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30d',
    });

    return token;
  }
}
