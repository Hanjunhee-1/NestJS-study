# 🔔 커스텀 데코레이터

- 이제 사용자는 요청을 보낼 때 JWT 토큰을 request header 에 함께 보내게 됩니다. 물론 안전하게 암호화가 되어서 보내지게 되며 server 에서는 해당 요청의 header 를 읽을 수 있습니다. `@Req()` 라는 데코레이터를 사용하면 user 라는 객체가 포함이 되어있는데 해당 객체가 바로 JWT 토큰의 내용입니다. 

- server 는 user 객체를 활용하면 되는데 @Req() 데코레이터를 통해 활용해도 상관이 없지만 이러면 코드를 이해하기 어려워질 수 있습니다. 그러므로 새로운 커스텀 데코레이터를 만드는 것이 좋습니다. 

- 아래와 같이 커스텀 데코레이터를 작성했습니다. 
    ```ts
        // get-user.decorator.ts
        import { createParamDecorator, ExecutionContext } from '@nestjs/common';
        import { User } from '@prisma/client';

        export const GetUser = createParamDecorator(
            (data, ctx: ExecutionContext): User => {
                const req = ctx.switchToHttp().getRequest();
                return req.user;
            },
        );
    ```
    - 커스텀 데코레이터의 이름은 GetUser 로 나중에 controller 에서 `@GetUser()` 와 같은 형태로 사용할 수 있습니다. 

    - 매개변수로 ctx 라는 것이 있는데 간단히 설명하면 현재 실행되는 프로세스의 추가 세부 정보를 제공하는 interface 입니다. 자세한 것은 링크[https://velog.io/@hahaha/NestJS-Execution-context] 를 참고해주세요

    - 그리고 data 라는 것도 있는데 이것은 커스텀 데코레이터를 사용할 때 넘겨주는 매개변수를 받는 것입니다. 자세한 것은 링크[https://velog.io/@mskwon/NestJS-Overview-Custom-Decorators] 를 참고해주세요 <br/><br/><br/>


- 마지막으로 controller 에서 테스트해봅니다. 
    ```ts
        // auth.controller.ts
        @Post('/test')
        @UseGuards(AuthGuard())
        test(@GetUser() user: User) {
            console.log(user);
        }
    ```
    - 크게 바뀐 것이 없다고 생각할 수 있지만 @Req() 를 사용할 때보다 코드의 이해도를 더욱 높여줍니다. 