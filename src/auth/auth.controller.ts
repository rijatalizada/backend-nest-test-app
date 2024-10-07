import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator';
import { LoginBody } from './DTO/LoginBody.dto';
import { error } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginBody) {
    const user = await this.authService.validateUser(body.email, body.password);

    if ('error' in user) {
      const errorMessage = user.error;
      throw new UnauthorizedException(errorMessage);
    }

    const access_token = await this.authService.getToken(
      user.id,
      user.email,
      user.name,
      user.phone,
    );

    return {
      access_token,
    };
  }
}
