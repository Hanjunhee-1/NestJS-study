# 🔔 간단한 예외처리(2)

- 게시물에 대해서도 사용자와 마찬가지로 존재 유무에 따른 예외처리가 필요합니다.
  ```ts
      // boards.service.ts
        deleteBoardById(id: string): void {
          const board = this.getBoardById(id);
          if (board) {
          this.boards = this.boards.filter((board) => board.id !== id);
          }
      }
  ```