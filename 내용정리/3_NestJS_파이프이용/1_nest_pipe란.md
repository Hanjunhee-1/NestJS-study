# 🔔 Pipe 에 대해서

- Pipe 는 사용자의 요청을 받아주는 Controller 와 사용자 사이에서 동작하는 것입니다.

    - controller 라는 상자가 있고 해당 상자로 어떤 것을 넣어야 할때를 생각해보면 왜 Pipe 라는 이름인지 이해가 잘 됩니다. <br/><br/><br/>

- Pipe 는 다음과 같은 일을 합니다.

    1. 데이터 변경
        - String 타입의 `"7"` 을 number 타입의 `7` 로 바꿔줍니다.

    2. 데이터 유효성 검증
        - 사용자는 number 타입의 변수만을 보내야하는데 String 타입으로 보내는 경우에 대한 유효성 검증을 할 수 있습니다. 이 외에도 다른 유효성 검증도 가능합니다. <br/><br/><br/>

- Pipe 는 다음과 같은 레벨에서 사용가능합니다. 

    1. Handler-level
        - @Get(), @Patch(), @Delete() 등과 같은 Handler 데코레이터 밑에 @UsePipe() 데코레이터를 선언하여 사용할 수 있습니다.

    2. Parameter-level
        ```ts
            @Param('id', ParseIntPipe) id: number
        ```
        - 위와 같이 @UsePipe() 와 같은 데코레이터를 선언하지 않고 따로 내장되어 있는 ParseIntPipe 를 사용할 수 있습니다.

    3. Global-level
        ```ts
            // main.ts
            async function bootstrap() {
                const app = await NestFactory.create(AppModule);

                // app.useGlobalPipes() 를 사용
                app.useGlobalPipes(GlobalPipes);
                await app.listen(3000);
            }
        ```
        - nest 프로젝트가 시작되는 위치인 main.ts 에서 전역적으로 Pipe 를 사용할 수 있게 설정할 수 있습니다. 
