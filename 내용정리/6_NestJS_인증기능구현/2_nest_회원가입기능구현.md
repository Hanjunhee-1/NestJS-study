# 🔔 회원가입 기능 구현하기

- 아래와 같이 회원 가입 기능에 필요한 것들을 작성해주었습니다. 
    ```ts
        // create-user.dto.ts
        import { IsNotEmpty } from 'class-validator';

        export class CreateUserDto {
            @IsNotEmpty()
            name: string;

            @IsNotEmpty()
            password: string;
        }
    ```
    ```ts
        // auth.service.ts
        import { Injectable } from '@nestjs/common';
        import { PrismaService } from 'src/prisma/prisma.service';
        import { CreateUserDto } from './dtos/create-user.dto';

        @Injectable()
        export class AuthService {
            constructor(private readonly prisma: PrismaService) {}

            async createUser(createUserDto: CreateUserDto) {
                const { name, password } = createUserDto;

                const user = await this.prisma.user.create({
                    data: {
                        name,
                        password,
                    },
                });

                return user;
            }
        }
    ```
    ```ts
        // auth.controller.ts
        import { Body, Controller, Post } from '@nestjs/common';
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
        }
    ```