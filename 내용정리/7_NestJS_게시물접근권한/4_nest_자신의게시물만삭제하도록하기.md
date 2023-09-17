# 🔔 자신의 게시물만 삭제하도록 하기

- 기존에 deleteBoard() 메소드는 자신이 작성한 것이 아니어도 게시물의 id 만 알고 있다면 게시물을 삭제할 수 있었습니다. 자신의 게시물은 본인만이 삭제할 수 있어야 하기 때문에 로직을 아래와 같이 수정해주었습니다. 
    ```ts
        // boards.controller.ts
        @Delete(':id')
        async deleteBoard(
            @Param('id', ParseIntPipe) id: number,
            @GetUser() user: User,
        ) {
            const result = await this.boardsService.deleteBoard(id, user);
            return result;
        }
    ```
    ```ts
        // boards.service.ts
        async deleteBoard(id: number, user: User) {
            const board: Board = await this.getBoardById(id);

            if (board.userId === user.id) {
                await this.prisma.board.delete({
                    where: {
                        id: board.id,
                    },
                });
            } else {
                throw new UnauthorizedException('게시물을 삭제할 권한이 없습니다.');
            }

            return 'success';
        }
    ```