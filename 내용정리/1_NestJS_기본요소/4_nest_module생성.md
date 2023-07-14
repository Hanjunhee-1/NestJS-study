# 🔔 Module 생성하기

- Board 라는 이름의 모듈을 생성해봅니다.
    ```
        nest g mo boards
    ```

    - 명령어 설명

        1. `nest`: nestcli 를 사용하는 명령어입니다.
        2. `g`: generate 를 축약한 것으로 생성 명령어입니다.
        3. `mo`: module 을 축약한 것으로 module 을 뜻합니다.
        4. `boards`: 생성할 module 의 이름을 나타냅니다.<br/><br/><br/>

- app.module.ts 파일의 내용이 변경된 것을 확인해봅니다.
    - 잘 보면 BoardsModule 이 자동으로 추가되어있는데 해당 내용은 `3_nest_module` 이란 에서 확인 가능합니다. 
<br/><br/><br/>

# 📢 모듈 생성시 주의할 점

- 모듈 뿐만이 아니라 controller, service 를 생성할 때도 주의해야 하는 부분입니다.

    1. module, controller, service 의 이름은 같도록 생성하기
    2. 서로 동일한 경로에서 생성하기

    위의 내용들을 지켜야 자동 import 가 됩니다. 