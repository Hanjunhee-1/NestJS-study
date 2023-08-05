# 🔔 특정 게시물의 상태 업데이트하기

- 이번에는 특정 게시물의 상태를 업데이트 해보았습니다. @Body(), @Param() 을 모두 사용했습니다.
    ```ts
        // boards.controller.ts
        @Patch(':id')
        updateBoardStatus(
            @Param('id') id: string,
            @Body('status') status: BoardStatus,
        ) {
            return this.boardsService.updateBoardStatus(id, status);
        }
    ```
    ```ts
        // boards.service.ts
        updateBoardStatus(id: string, status: BoardStatus): Board {
            const board = this.getBoardById(id);
            board.status = status;
            return board;
        }
    ```