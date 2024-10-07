import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(createUserDto.password, 10);

    const user = new User({
      name: createUserDto.name,
      email: createUserDto.email,
      phone: createUserDto.phone,
      password: password,
    });

    return await user.save();
  }

  async getUser(id: string) {
    const users = await this.userModel.findByPk(id);

    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ where: { email } });

    return user;
  }
}
