# 🔔 간단한 예외처리

- 만약 사용자가 존재하지 않는 게시물의 id 를 입력했을 경우, 그에 맞는 예외처리를 해주어야 합니다.
  ```ts
      // boards.service.ts
        getBoardById(id: string): Board {
          const board = this.boards.find((board) => board.id === id);

          if (!board) {
          throw new NotFoundException(`${id} 를 가진 게시물을 찾을 수 없습니다 X(`);
          }

          return board;
      }
  ```