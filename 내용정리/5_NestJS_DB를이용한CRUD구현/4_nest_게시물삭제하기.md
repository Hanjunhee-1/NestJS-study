# 🔔 게시물 삭제하기

- 아래와 같이 작성해주었습니다.
    ```ts
        // boards.service.ts
        async deleteBoard(id: number) {
            const board = await this.getBoardById(id);

            await this.prisma.board.delete({
                where: {
                    id: board.id,
                },
            });

            return 'success';
        }
    ```
    ```ts
        // boards.controller.ts
        @Delete(':id')
        async deleteBoard(@Param('id', ParseIntPipe) id: number) {
            const result = await this.boardsService.deleteBoard(id);
            return result;
        }
    ```