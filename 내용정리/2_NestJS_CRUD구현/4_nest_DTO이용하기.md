# 🔔 DTO 란?

- DTO 는 Data Transfer Object 의 약자로 service 와 controller 간의 데이터 교환을 위한 객체입니다.

    - controller 와 service 간의 데이터 교환 말고 다른 곳에도 사용이 될 수 있지만 해당 경우가 가장 많이 쓰입니다.<br/><br/>

- DTO 를 사용해야 하는 이유는 다음과 같습니다.

    1. @Body(), @Query(), @Param() 등으로 사용자가 보낸 요청을 간단히 다룰 수 있습니다.

    2. 유지보수 및 코드 관리가 용이해집니다.<br/><br/>

- controller 와 service 간에 사용되는 DTO 는 크게 2가지로 나뉩니다.

    1. controller 에서 service 로 가는 DTO
        - controller 에 전달된 사용자의 요청을 service 로직에서 해결해주기 위해 사용합니다.

    2. service 에서 controller 로 가는 DTO
        - service 로직에서 해결된 결과를 보기 좋게 가공 혹은 필요한 것만 추려내기 위해 사용합니다.<br/><br/>

- DTO 는 보통 다음의 순서대로 만들고 관리하게 됩니다.

    1. DTO 가 필요한 모듈의 디렉토리 밑에 `dto` 혹은 `dtos` 라는 이름으로 폴더를 생성합니다.

    2. `kebab-case` 로 DTO 이름을 지정하고 DTO class 코드를 작성합니다. <br/><br/><br/>

# 🔔 DTO 작성해보기

- 다음과 같이 board 생성을 위한 DTO 를 작성해보았습니다. 
    ```ts
        // create-board.dto.ts
        export class CreateBoardDto {
            title: string;
            description: string;
        }
    ```

- 만들어준 DTO 를 controller 및 service 에서 사용할 수 있도록 수정해줍니다. 
    ```ts
        // boards.controller.ts
        @Post()
        createBoard(@Body() createBoardDto: CreateBoardDto): Board {
            return this.boardsService.createBoard(createBoardDto);
        }
    ```
    ```ts
        // boards.service.ts
        createBoard(createBoardDto: CreateBoardDto): Board {

            // {} 으로 감싸고 변수명을 지정하면 해당 객체 중 변수명에 대한 값을 받아올 수 있다.
            const { title, description } = createBoardDto;
            const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC,
            };

            this.boards.push(board);
            return board;
        }
    ```

- DTO 를 사용함으로써 사용자가 보내는 요청이 늘어나거나 줄어든다고 해도 DTO class 만을 수정하면 되니까 효율적입니다. 