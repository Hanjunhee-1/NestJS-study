# 🔔 게시물 생성하기

- createBoard() 메소드를 prisma API 를 사용하는 로직으로 수정했습니다.
    ```ts
        // boards.service.ts
        async createBoard(createBoardDto: CreateBoardDto) {
            const { title, description } = createBoardDto;

            const board = await this.prisma.board.create({
                data: {
                    title,
                    description,
                },
            });
            return board;


            // 추가 - 이런 방식도 있는데 return 값이 원하는대로(API 문서대로) 나오지 않을 듯...
            // const board: Prisma.BoardUncheckedCreateInput = {
            //   title,
            //   description,
            // };

            // // await this.prisma.board.create({ data: board });
            // return board;
        }
    ```