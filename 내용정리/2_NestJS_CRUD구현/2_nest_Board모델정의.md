# ❓ 모델을 정의하는 이유

- 모델을 정의하는 이유는 TypeScript 를 사용하고 있기 때문입니다. JavaScript 에서도 타입을 지정해주는 것이 가능하지만 보통은 타입을 따로 지정해주지 않았습니다. ex) any 등으로 아무 타입이나 상관없이 코드를 작성한 경우가 많습니다.

- 타입이 존재하지 않게되면 나중에 코드에서 에러가 났을 때 타입 때문에 그런 것인지 뭔가를 빼먹고 작성한 것인지 판별하기 어렵습니다.

- 하지만 변수에 대해 타입이 존재하게 되면 에러가 났을 때 그 원인을 빠르게 찾을 수 있습니다. 그렇기 때문에 타입을 정의해주기 위한 모델을 정의해주는 것입니다. <br/><br/><br/>


# 🔔 Board 모델 정의하기

- 모델을 정의하기 위해서는 interface 혹은 class 를 사용하면 됩니다.

- interface 와 class 의 차이는 다음과 같습니다.

    1. interface
        property 의 타입만을 체크합니다.

    2. class
        property 의 타입 체크는 물론이며 instance(객체) 를 생성할 수 있습니다.

- 아래와 같이 Board 모델을 정의했습니다.
    ```ts
        // board.model.ts
        export interface Board {
            id: string;
            title: string;
            description: string;
            status: BoardStatus;
        }

        export enum BoardStatus {
            PUBLIC = 'PUBLIC',
            PRIVATE = 'PRIVATE',
        }
    ```

- Board 모델을 정의했으니 기존에 작성된 Controller 와 Service 의 코드도 약간 수정을 해주었습니다. 
    ```ts
        // boards.service.ts
        private boards: Board[] = [];

        getAllBoard(): Board[] {
            return this.boards;
        }
    ```
    ```ts
        // boards.controller.ts
        @Get()
        getAllBoard(): Board[] {
            return this.boardsService.getAllBoard();
        }
    ```

※  함수와 변수의 Type 명시는 굳이 안해도 되지만 가독성을 위해서 해주는 것이 좋습니다.   