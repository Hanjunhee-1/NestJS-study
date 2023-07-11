# 🔔 NestJS 로직 흐름

- 로직 흐름이라기보다는 main.ts 에 대한 내용이라고 보면 됩니다.

- 아래와 같이 main.ts 가 존재합니다.
  ```js
    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      await app.listen(3000);
    }
    bootstrap();
  ```

  - main.ts 가 server 를 열어주게 되면 간단하게 아래와 같은 흐름대로 동작하게 됩니다.
    
    1. 사용자가 보낸 request 를 controller 에서 받아줍니다.
    2. controller 는 해당 request 에 대한 service 를 해줍니다.
    3. service 는 작성된 로직대로 결과 값을 반환합니다.
    4. controller 는 반환된 결과 값을 사용자에게 response 합니다.<br/>
    ※ 위의 과정은 정말 간단하고 기초적인 과정이고 위의 과정 외에도 pipe, exception, middle-ware 등과 같은 추가적인 과정이 더 있습니다. 