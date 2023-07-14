# 🔔 Controller 에 대해서

- Controller 는 `@Controller()` 라는 데코레이터로 표현합니다.

- 데코레이터에서 매개변수를 받을 수 있는데 경로를 나타내도록 할 수 있습니다. 예를 들어, `host주소/boards` 경로로 접속하게 하고 싶다면 데코레이터를 아래와 같이 작성할 수 있습니다.
    ```js
        @Controller('/boards')
    ```

- 어떤 경로에 대한 버전관리도 가능한데 아래와 같이 작성할 수 있습니다.
    ```js
        @Controller({version: 1, path: boards})
    ```
    - 위의 예시의 경우에는 `host주소/v1/boards` 로 접속하게 됩니다. <br/><br/>

- Controller 로 선언된 class 의 내부에서는 HTTP Handler 를 다룰 수 있습니다.

    - Handler 또한 데코레이터로 표현되면 `@Get()`, `@Post()`, `@Put()`, `@Patch()`, `@Delete()` 로 사용할 수 있습니다.

    - 예를 들어 boardId 가 1인 board 를 보고 싶다면 아래와 같이 작성할 수 있습니다.
        ```js
            @Controller('/boards')
            ...
            @Get(':id')
        ``` <br/><br/>


# 👀 잠깐 알고 넘어가기 - PUT 과 PATCH 의 차이점

- 공통점은 둘 다 CRUD 작업 중에서 update 에 해당하는 작업이라는 것입니다.

- 하지만 put 은 모든 data 를 바꿀 때 사용하고 patch 는 data 의 일부만 바꿀 수 있도록 한다고 합니다.

- 그런데 NestJS 를 사용하면 DTO 및 class-validator, class-transformer 를 통해 put, patch 상관없이 모두 받거나 선택적으로 받게 할 수 있습니다. 