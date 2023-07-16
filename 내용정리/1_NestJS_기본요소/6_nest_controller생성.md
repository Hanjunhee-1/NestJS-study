# 🔔 Controller 생성하기

- Controller 는 아래와 같은 방법으로 생성합니다.
    ```
        nest g co board --no-spec
    ```

    - 명령어 설명

        1. `nest`: nestcli 를 사용하는 명령어입니다.
        2. `g`: generate 를 축약한 것으로 생성 명령어입니다.
        3. `co`: controller 를 축약한 것으로 controller 를 뜻합니다.
        4. `boards`: 생성할 controller 의 이름을 나타냅니다.
        5. `--no-spec`: 테스트 파일을 생성하지 않겠다는 뜻으로 선택 옵션입니다.<br/><br/><br/>

- Controller 를 생성하고 나면 해당 Controller 가 포함되는 모듈의 controllers 라는 배열에 자동으로 추가되는 모습을 볼 수 있습니다.
    - 만약 module 을 먼저 생성하지 않았다면 controller 만 생성되고 끝입니다.