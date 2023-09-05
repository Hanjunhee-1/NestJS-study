# 🔔 로그인 기능 구현하기

- 로그인에 사용할 dto 를 작성해주었습니다.
    ```ts
        // sign-in.dto.ts
        import { IsNotEmpty } from 'class-validator';

        export class SignInDto {
            @IsNotEmpty()
            name: string;

            @IsNotEmpty()
            password: string;
        }
    ```
    <br/><br/><br/>

- 그리고 로그인 기능을 구현해주었습니다. 
    ```ts
        // auth.service.ts
        async signIn(signInDto: SignInDto) {
            const { name, password } = signInDto;

            const user = await this.prisma.user.findUnique({
                where: {
                    name,
                },
            });

            if (user && (await bcrypt.compare(password, user.password))) {
                return 'success';
            } else {
                throw new UnauthorizedException('failed');
            }
        }
    ```
    ```ts
        // auth.controller.ts
        @Post('/signIn')
        async signIn(@Body() signInDto: SignInDto) {
            const result = await this.authService.signIn(signInDto);
            return result;
        }
    ```
    - 위의 내용들은 '진짜' 로그인이 아니라 아이디와 비밀번호가 맞게 입력되었는지만을 확인하는 기능이라고 보면 됩니다. 진짜 로그인을 구현하기 위해서는 토큰 기반의 로그인 기능을 구현해야 합니다. 예를 들면, JWT 를 사용하는 방식이 있습니다. 