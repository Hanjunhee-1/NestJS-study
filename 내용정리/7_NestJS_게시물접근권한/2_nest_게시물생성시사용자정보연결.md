# 🔔 게시물 생성 시 사용자 정보 연결

- 게시물을 생성할 때 사용자 정보를 연결시켜주는 작업을 해주었습니다. 
    ```ts
        // boards.controller.ts 
        @Post()
        async createBoard(
            @Body() createBoardDto: CreateBoardDto,
            @GetUser() user: User,
        ) {
            const board = await this.boardsService.createBoard(createBoardDto, user);
            return board;
        }
    ```
    - `@GetUser()` 데코레이터를 통해 인증된 사용자의 정보를 다룰 수 있습니다. 해당 정보를 service 로직으로 넘겨줍니다. 

    ```ts
        // boards.service.ts
        async createBoard(createBoardDto: CreateBoardDto, user: User) {
            const { title, description } = createBoardDto;

            const board: Board = await this.prisma.board.create({
                data: {
                    title,
                    description,
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
                include: {
                    user: true,
                },
            });
            return board;
        }
    ```


