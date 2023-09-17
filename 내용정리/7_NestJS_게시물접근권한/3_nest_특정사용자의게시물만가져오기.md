# 🔔 특정 사용자의 게시물만 가져오기

- 기존에 getBoards() 메소드는 존재하는 모든 게시물을 가져옵니다. 그래서 여기에 query parameter 를 추가하여 특정 사용자의 게시물을 조회할 수 있는 기능을 추가해주었습니다. 
    ```ts
        // boards.controller.ts
        @Get()
        async getBoards(@Query('userId') userId: number) {
            const boards = await this.boardsService.getBoards(+userId);
            return boards;
        }
    ```
    ```ts
        // boards.service.ts
        async getBoards(userId: number) {
            let boards: Board[];

            if (userId) {
                boards = await this.prisma.board.findMany({
                    where: {
                        userId,
                    },
                });
            } else {
                boards = await this.prisma.board.findMany({
                    include: {
                        user: true,
                    },
                });
            }
            return boards;
        }
    ```
    - `@Query('userId')` 를 통해 사용자로부터 userId 를 받아줍니다. 