# 🔔 JWT 를 통한 인증 구현하기

- JWT 토큰을 발급받고 이를 통한 인증이 가능하도록 해야합니다.

- 우선 필요한 패키지를 설치합니다.
    ```
        npm i @types/passport-jwt
    ```
    <br/><br/>

- 그리고 인증 로직을 작성해줍니다.
    ```ts
        // jwt.strategy.ts
        import { Injectable, UnauthorizedException } from '@nestjs/common';
        import { PassportStrategy } from '@nestjs/passport';
        import { User } from '@prisma/client';
        import { ExtractJwt, Strategy } from 'passport-jwt';
        import { PrismaService } from 'src/prisma/prisma.service';

        @Injectable()
        export class JwtStrategy extends PassportStrategy(Strategy) {
            constructor(private readonly prisma: PrismaService) {
                super({
                    secretOrKey: process.env.SECRET_KEY,
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                });
            }
            async validate(payload) {
                const { name } = payload;
                const user: User = await this.prisma.user.findUnique({
                    where: {
                        name,
                    },
                });

                if (!user) {
                    throw new UnauthorizedException();
                }

                return user;
            }
        }
    ```
    - JWT 토큰을 발급해주면 payload 에는 사용자의 이름과 id 값이 있습니다. 그것을 통해 DB 에서 사용자를 찾아내어 예외처리를 해주면 됩니다. 

    - `PassportStrategy` 라는 부모 클래스에 `{ secretOrKey: process.env.SECRET_KEY, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() }` 를 넘겨줍니다. `secretOrKey` 는 JWT 토큰의 signature 를 verify 해주기 위해 사용했던 SECRET_KEY 를 넣어줍니다. `jwtFromRequest` 는 사용자가 어떠한 토큰 인증 방식으로 요청을 보낸 것인지 알기 위해 필요한데 JWT 는 BearerToken 으로 요청을 보냅니다. 

    - 그리고 JWT 토큰에 대한 인증을 해주기 위한 `validate()` 라는 함수를 작성해주었습니다. <br/><br/><br/>

- 이제 auth.module.ts 를 수정해줍니다. 
    ```ts
        // auth.module.ts
        @Module({
            imports: [
                PrismaModule,
                PassportModule.register({ defaultStrategy: 'jwt' }),
                JwtModule.register({
                    secret: process.env.SECRET_KEY,
                    signOptions: {
                        expiresIn: 60 * 60,
                    },
                }),
            ],
            controllers: [AuthController],
            providers: [AuthService, JwtStrategy],
            exports: [JwtStrategy, PassportModule],
        })
        export class AuthModule {}
    ```
    - 로그인과 회원가입에 필요한 `AuthService` 외에도 JWT 토큰 인증에 필요한 `JwtStrategy` 를 `providers` 에 추가하여 사용합니다. 

    - `JwtStrategy` 는 `PassportStrategy` 를 상속받는 형태이기 때문에 `PassportModule` 도 `exports` 에 추가해주었습니다. <br/><br/><br/>


- 그리고 controller 에서 테스트해보았습니다. 
    ```ts
        // auth.controller.ts
        import { AuthGuard } from '@nestjs/passport';
        ...

        @Post('/test')
        @UseGuards(AuthGuard())
        test(@Req() req) {
            console.log(req.user);
        }
    ```
    - 반드시 `@UseGuards(AuthGuard())` 를 추가해주어야만 JWT 를 통해 인증을 해줄 수 있습니다. 