import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto);
    return user;
  }

  @Post('/signIn')
  async signIn(@Body() signInDto: SignInDto) {
    const result = await this.authService.signIn(signInDto);
    return result;
  }

  // JWT 토큰으로 정보요청 테스트
  @Post('/test')
  @UseGuards(AuthGuard())
  // @GetUser() 에 'name' 을 넘겨준 것을 어떻게 활용하는지는 get-user.decorator.ts 에서 확인 가능
  test(@GetUser('name') user: User) {
    console.log(user);
  }
  // JWT 토큰으로 정보요청 테스트

  // bcrypt 복호화 예시
  // @Get('/logIn')
  // async logIn(@Body('name') name: string, @Body('password') password: string) {
  //   const result = await this.authService.logIn(name, password);
  //   return result;
  // }
  // bcrypt 복호화 예시
}
