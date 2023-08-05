# 🔔 특정 게시물 지우기

- path parameter 를 받아서 특정 게시물을 지우는 로직을 추가했습니다.
    ```ts
        // boards.controller.ts
        @Delete(':id')
        deleteBoardById(@Param('id') id: string): void {
            return this.boardsService.deleteBoardById(id);
        }
    ```
    ```ts
        // boards.service.ts
        deleteBoardById(id: string): void {
            this.boards = this.boards.filter((board) => board.id !== id);
        }
    ```