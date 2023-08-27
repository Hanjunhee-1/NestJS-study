# 🔔 인증기능 구현 준비하기

- 게시물에 관한 것을 어느 정도 만들었으니 이제는 사용자에 관한 것을 만들어보겠습니다. 

- 일단 아래의 명령어들을 순서대로 입력하여 사용자와 관련된 모듈을 만들어주었습니다.
    ```
        nest g module auth
    ```
    ```
        nest g controller auth --no-spec
    ```
    ```
        nest g service auth --no-spec
    ```
    <br/><br/><br/>

- schema.prisma 에 User 모델을 추가해주었습니다.
    ```
        // schema.prisma
        model User {
            id              Int         @id @default(autoincrement())
            name            String      @db.VarChar(255)
            password        String      @db.VarChar(255)
        }
    ```
    - 원래는 Board 모델과 User 모델 간의 관계도 설정해주어야 하는데 해당 부분은 추후에 따로 작업을 하고 사용자와 관련된 기능을 먼저 개발하도록 하겠습니다.