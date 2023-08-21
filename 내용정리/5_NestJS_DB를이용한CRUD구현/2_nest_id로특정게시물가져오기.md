# 🔔 id 로 특정 게시물 가져오기

- 기존의 로직에서 prisma API 를 사용하는 것으로 수정해야 합니다. 

    - prisma API 의 경우에는 링크를 참고하면 더 자세히 알아볼 수 있습니다. (https://www.prisma.io/docs/concepts/components/prisma-client/crud)

- prisma API 를 통해 `getBoardById()` 부분을 다시 구현했습니다.
    ```ts
        // boards.service.ts
        async getBoardById(id: number) {
            const board = await this.prisma.board.findUnique({
                where: {
                    id,
                },
            });

            if (!board) {
                throw new NotFoundException(
                    '해당 id 를 가지는 게시물을 찾을 수 없습니다 X(',
                );
            }

            return board;
        }
    ```
    <br/><br/>
    ```ts
        // boards.controller.ts
        @Get(':id')
        async getBoardById(@Param('id', ParseIntPipe) id: number) {
            const board = await this.boardsService.getBoardById(id);
            return board;
        }
    ```