# 🔔 모든 게시물 가져오기

- 모든 게시물을 가져오는 것도 prisma API 를 통해 작성해주었습니다.
    ```ts
        // boards.service.ts
        async getBoards() {
            const boards = await this.prisma.board.findMany();
            return boards;
        }
    ```
    ```ts
        // boards.controller.ts
        @Get()
        async getBoards() {
            const boards = await this.boardsService.getBoards();
            return boards;
        }
    ```