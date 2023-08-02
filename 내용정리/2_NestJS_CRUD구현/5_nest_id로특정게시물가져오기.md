# 🔔 Path parameter 사용해보기

- 사용자로부터 path parameter 로 id 를 입력받고 해당 id 의 게시물을 보여주는 기능을 만들어보겠습니다.

- 아래와 같이 controller 와 service 의 내용을 추가해주었습니다. 
    ```ts
        // boards.controller.ts
        @Get(':id')
        getBoardById(@Param('id') id: string): Board {
            return this.boardsService.getBoardById(id);
        }
    ```
    ```ts
        // boards.service.ts
        getBoardById(id: string): Board {
            return this.boards.find((board) => board.id === id);
        }
    ```

- Path parameter 가 무엇인가요?

    - `http://localhost:3000/boards/1` 과 같은 식으로 되어있을 때 1 이 path parameter 의 값이 됩니다. 만약 해당 요청이 GET 요청이라고 하고 REST API 로 작성되었다고 가정했을 때 `여러 board 중에서 id 가 1인 board 를 반환하는구나` 라는 것을 유추해볼수 있습니다. 