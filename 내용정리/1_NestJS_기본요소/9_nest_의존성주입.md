# 🔔 NestJS 에서의 의존성 주입(DI)

- 클라이언트에서 request 를 보내면 해당 request 를 받는 곳은 Controller 입니다.

- Controller 에서 request 를 받고 그에 대한 각종 작업을 해도 되지만 이는 굉장히 비효율적입니다.
    - 코드의 역할과 구분이 모호해지고 나중에 유지보수가 힘들어집니다...

- 그래서 Service 라는 파일에서 각종 작업을 하고 Controller 에서는 해당 request 를 받으면 Service 를 호출하여 작업을 시키는 것입니다.
    - 쉽게 생각하면 Controller 도 본인의 일을 하고 있지만 비중이 높은 DB 작업 혹은 스케줄러, 예외처리 등과 같은 것은 Service 에게만 시키는 것입니다.

- 의존성 주입이라는 것은 첫번째로 Controller 에서 일어나게 됩니다.
    ```ts
        // boards.controller.ts
        constructor(private readonly boardsService: BoardsService) {}
    ```

- 클래스에서 객체를 생성하는 것을 생각해보면 이렇게 짧게 끝날 것이 아닙니다!!!
    ```ts
        // 일단 객체로 사용할 변수를 선언합니다.
        boardsService: BoardsService;

        // 클래스가 생성될 때 해당 객체를 주입받습니다.
        constructor(boardsService: BoardsService) {
            this.boardsService = boardsService;
        }
    ```

- 생성자에서 단지 선언해주는 것만으로 의존성 주입이 가능한 이유는 접근 제한자(private) 를 사용해주었기 때문에 NestJS 에서 암묵적으로 현재 클래스의 멤버 변수로 취급하게 되고 덕분에 따로 의존성 주입을 해줄 필요가 없게 됩니다. 