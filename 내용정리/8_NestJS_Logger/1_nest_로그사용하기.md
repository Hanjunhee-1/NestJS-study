# 🔔 Logger 사용해보기

- NestJS 에서 logger 를 사용하는 방법을 알아보겠습니다.

- log 의 종류는 다음과 같습니다.
    
    1. `Log`: 중요한 정보를 로깅하는 범용 로그입니다.

    2. `Warning`: 치명적이거나 파괴적이지 않은 처리되지 않은 문제를 로깅합니다.

    3. `Error`: 치명적이거나 파괴적인 처리되지 않은 문제를 로깅합니다.

    4. `Debug`: 오류 발생시 로직을 디버그하는데 도움이 되는 유용한 정보입니다. 

    5. `Verbose`: 응용 프로그램에 대한 통찰력을 제공하는 정보입니다. <br/><br/><br/>

- NestJS 프로젝트가 실행될 때 어느 호스트의 어떤 포트에서 프로젝트가 실행되고 있는지 알려주는 logger 를 작성했습니다.
    ```ts
        // main.ts
        import { Logger, ValidationPipe } from '@nestjs/common';
        import { NestFactory } from '@nestjs/core';
        import { AppModule } from './app.module';
        import { PrismaService } from './prisma/prisma.service';

        async function bootstrap() {
            const logger = new Logger('Main');
            const app = await NestFactory.create(AppModule);
            app.useGlobalPipes(new ValidationPipe());
            const prismaService = app.get(PrismaService);
            await prismaService.enableShutDownHooks(app);
            await app.listen(3000);
            logger.log(`Server is running at http://localhost:3000`);
        }
        bootstrap();
    ```
    <br/><br/><br/>

- 그리고 controller 에도 적용해줍니다. 
    ```ts
        // boards.controller.ts
        @Controller('boards')
        @UseGuards(AuthGuard())
        export class BoardsController {
            private readonly logger = new Logger('BoardsController');
            ...

            @Post()
            async createBoard(
                @Body() createBoardDto: CreateBoardDto,
                @GetUser() user: User,
            ) {
                this.logger.verbose(`${user.name} trying to create new board
                Payload: ${JSON.stringify(createBoardDto)}`);
                const board = await this.boardsService.createBoard(createBoardDto, user);
                return board;
            }

            @Delete(':id')
            async deleteBoard(
                @Param('id', ParseIntPipe) id: number,
                @GetUser() user: User,
            ) {
                this.logger.verbose(`${user.name} trying to delete board has id: ${id}`);
                const result = await this.boardsService.deleteBoard(id, user);
                return result;
            }
        }
    ```
    - Logger 객체를 생성할 때 현재 logger 가 실행되고 있는 위치를 적어주면 됩니다. ex) `Main`, `BoardsController` 등등

    - JSON.stringfy() 는 JSON 객체 전체를 string 으로 만들어주는 기능을 하고 있습니다. <br/><br/><br/>

- logger 는 개발이 끝났을 때 한 번에 적용하는 것이 아니라 새로운 service 로직을 작성할 때마다 적용해주는 것이 좋습니다. 