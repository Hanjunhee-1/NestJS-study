# 🔔 JWT 토큰 생성

- 자세한 것은 아래의 링크를 참고해주세요

    - https://docs.nestjs.com/security/authentication#authentication
    <br/><br/>

- JWT 를 다루기 위해 필요한 패키지들을 설치해줍니다.
    ```
        npm i @nestjs/jwt @nestjs/passport passport passport-jwt
    ```
    <br/><br/>

- 그리고 JWT 적용이 필요한 모듈에서 JWT 에 대한 설정을 해줍니다.
    ```ts
        // auth.module.ts
        import { Module } from '@nestjs/common';
        import { JwtModule } from '@nestjs/jwt';
        import { PassportModule } from '@nestjs/passport';
        import { PrismaModule } from 'src/prisma/prisma.module';
        import { AuthController } from './auth.controller';
        import { AuthService } from './auth.service';

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
            providers: [AuthService],
        })
        export class AuthModule {}
    ```
    - Passport 는 Nodejs 에서 가장 유명한 인증 라이브러리입니다.

    - `defaultStrategy` 에서 JWT 를 사용한다는 설정을 해줍니다. 

    - `JwtModule.register` 에서 secret 은 JWT 토큰 복호화에 사용될 key 값을 넣어줍니다. 보안에 민감한 요소이기 때문에 env 파일로 관리해줍니다. 그리고 signOptions 에서는 JWT 토큰의 유효 기간을 설정해줍니다. <br/><br/><br/>

- 이제 service 로직을 작성해줍니다.
    ```ts
        // auth.service.ts
        constructor(
            private readonly prisma: PrismaService,

            // JWT 사용을 위한 의존성 주입 추가!
            private readonly jwtService: JwtService,
        ) {}
        
        ...

        async signIn(signInDto: SignInDto) {
            const { name, password } = signInDto;

            const user = await this.prisma.user.findUnique({
                where: {
                    name,
                },
            });

            if (user && (await bcrypt.compare(password, user.password))) {
                const payload = {
                    id: user.id,
                    name: name,
                };

                const accessToken = await this.jwtService.sign(payload);
                return { accessToken: accessToken };
            } else {
                throw new UnauthorizedException('failed');
            }
        }
    ```
    <br/><br/>

- 이제 잘되는지 아래와 같은 과정을 통해 테스트해봅니다.

    1. 우선 로그인을 하여 JWT 토큰을 발급받습니다.
    2. 해당 JWT 토큰을 복사하여 https://jwt.io#debugger-io 로 이동합니다.
    3. Decoded 의 VERIFY SIGNATURE 부분에서 자신이 설정한 SECRET_KEY 를 입력합니다.
    4. Encoded 부분을 싹 지워주고 JWT 토큰을 복사하여 넣습니다.
    5. Encoded 부분 맨 아래에 `Invalid Signature` 가 아닌 `Signature Verified` 가 나오고 `PAYLOAD` 부분에 자신이 작성했던 payload 의 내용대로 나오면 JWT 토큰 발급이 정상적으로 된 것입니다. 위의 코드의 경우에는 user 의 id 와 name 이 payload 에 포함되어 있어야 합니다.