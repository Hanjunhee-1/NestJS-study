# 🔔 게시물 생성하기

- 아래와 같이 게시물을 생성하는 로직을 작성했습니다.
    ```ts
        // boards.service.ts
        createBoard(title: string, description: string): Board {
            const board: Board = {
                id: uuid(),
                title,
                description,
                status: BoardStatus.PUBLIC,
            };

            this.boards.push(board);
            return board;
        }
    ```
    - id 의 경우에는 DB 와 연동했다면 autoincreament 를 사용하면 되지만 DB 와 연동을 하지 않았기 때문에 uuid 라는 패키지를 사용해주었습니다. <br/><br/><br/>

- service 에 게시물을 생성하는 로직을 작성해두었으니 controller 에도 해당 로직을 호출하는 함수를 작성해야 합니다.
    ```ts
        // boards.controller.ts
        @Post()
        createBoard(
            @Body('title') title: string,
            @Body('description') description: string,
        ): Board {
            return this.boardsService.createBoard(title, description);
        }
    ```
    - 생성을 위해서는 Post 핸들러를 사용해야 합니다.
    - express 를 사용할 때는 body-parser 라는 패키지를 사용해야 했는데 nestjs 에서는 @Body() 데코레이터를 통해 json 객체로 받아올 수 있습니다. 
    - 데코레이터의 인자로 string 값을 주면 해당 값을 name 으로 가지는 key 의 value 를 가져올 수 있습니다. 