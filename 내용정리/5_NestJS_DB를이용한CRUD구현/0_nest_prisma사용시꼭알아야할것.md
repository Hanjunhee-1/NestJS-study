# 🔔 Prisma 사용시 알아두어야 할것

- Prisma 를 통해 DB 작업이 필요한 service 에서는 해당 service 가 속해있는 module 에서 imports 부분에 PrismaModule 을 추가해주어야 합니다. 단, PrismaModule 이 global 모듈로 설정되었다면 해줄 필요 없습니다. 

- 의존성 주입을 통해 PrismaService 객체에 접근해야 하는데 예시는 아래와 같습니다.
    ```ts
        constructor(private readonly prisma: PrismaService) {}
    ```