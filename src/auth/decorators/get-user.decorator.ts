import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    // data 사용예시
    // auth.controller.ts 의 '/test' 경로 라우트 핸들러에서 'name' 이라는 값을 넘겨주었다면
    // req.user 는 name 을 갖고 있기 때문에 console.log() 로 찍어줄 수 있음
    // if (data) {
    //   console.log(req.user?.[data]);
    // }
    return req.user;
  },
);
