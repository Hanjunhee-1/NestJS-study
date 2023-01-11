import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createUser(createUserDto);
    return user;
  }

  // bcrypt 복호화 예시
  @Get('/logIn')
  async logIn(@Body('name') name: string, @Body('password') password: string) {
    const result = await this.authService.logIn(name, password);
    return result;
  }
  // bcrypt 복호화 예시
}
