# 🔔 인증된 사용자만 CRUD 작업 허용하기

- AuthModule 을 통해 JWT 토큰을 가지고 있는 사용자만 게시물을 열람하고 작성하는 등의 작업을 허용하도록 해주었습니다. 
    ```ts
        // boards.module.ts
        import { Module } from '@nestjs/common';
        import { AuthModule } from 'src/auth/auth.module';
        import { BoardsController } from './boards.controller';
        import { BoardsService } from './boards.service';

        @Module({
            // JWT 토큰 기반 인증을 위해 AuthModule 추가
            imports: [AuthModule],
            controllers: [BoardsController],
            providers: [BoardsService],
        })
        export class BoardsModule {}
    ```
    ```ts
        // boards.controller.ts
        @Controller('boards')
        @UseGuards(AuthGuard())
        export class BoardsController {
            ...
        }    
    ```
    - Guard 를 controller 레벨에서 적용시켜주면 HTTP handler 에 일일이 추가해주지 않아도 됩니다.

    - 이렇게 함으로써 JWT 토큰 없이 해당 API 를 사용하려는 사람을 막을 수 있습니다.