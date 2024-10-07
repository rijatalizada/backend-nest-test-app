import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Public()
  @Get('get-user/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Public()
  @Post('add-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);

    return user;
  }
}
