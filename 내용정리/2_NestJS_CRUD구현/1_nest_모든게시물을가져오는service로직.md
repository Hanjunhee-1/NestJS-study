# 🔔 service 로직 작성해보기

- 바로 DB 를 연동하지 않고 로컬에 data 를 저장하는 방식으로 구현했습니다.

- service 로직에서 로컬에 저장된 boards 를 반환하는 함수를 구현하고 controller 에서 @Get() 데코레이터로 함수를 생성했습니다.
    ```ts
        // boards.service.ts
        private boards = [];

        getAllBoard() {
            return this.boards;
        }
    ```
    ```ts
        // boards.controller.ts
        @Get()
        getAllBoard() {
            return this.boardsService.getAllBoard();
        }
    ```