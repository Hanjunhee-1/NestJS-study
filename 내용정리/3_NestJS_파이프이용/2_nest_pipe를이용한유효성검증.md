# 🔔 Pipe 를 통한 데이터 유효성 검증

- Pipe 를 통해 데이터 유효성을 검증할 수 있습니다. 예시는 아래와 같습니다.
    ```ts
        // create-board.dto.ts
        export class CreateBoardDto {
            @IsNotEmpty()
            title: string;

            @IsNotEmpty()
            description: string;
        }
    ```
    - @IsNotEmpty() 데코레이터는 데이터가 비어있는지 확인해주는 데코레이터입니다. <br/><br/><br/>

- 위와 같이 Pipe 를 통해 데이터 유효성 검증을 해주는 class 를 작성했으니 controller 의 handler 에서도 해당 class 를 통해 데이터를 받을 수 있게 해주어야 합니다.
    ```ts
        // boards.controller.ts
        @Post()
        @UsePipes(ValidationPipe)
        createBoard(@Body() createBoardDto: CreateBoardDto): Board {
            return this.boardsService.createBoard(createBoardDto);
        }
    ```
    - @UsePipes() 데코레이터가 있어야지만 Pipe 를 사용할 수 있고 여러 Pipe 중에 유효성 검증을 위한 ValidationPipe 를 사용할 것이라고 명시해주었습니다. 이렇게 하면 CreateBoardDto 의 내용대로 title 과 description 을 받을 수 있고 유효성 검증도 할 수 있습니다. 
    
    - 각 값을 받기 위해서는 json 형식으로 데이터를 주어야 합니다. 예시는 아래와 같습니다.
        ```json
            {
                "title": "nestjs",
                "description": "서버 개발 프레임워크입니다."
            }
        ```