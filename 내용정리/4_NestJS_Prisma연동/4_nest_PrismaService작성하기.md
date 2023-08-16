# 🔔 Prisma 사용을 위한 service 작성하기

- service 로직만 작성하면 Prisma 를 제대로 사용할 수 있습니다.

- 아래와 같이 작업을 해주었습니다.

    1. src 디렉토리에 prisma 모듈을 생성합니다.
        ```
            nest g mo prisma
        ```

    2. service 도 생성해줍니다.
        ```
            nest g service prisma --no-spec
        ```

    3. `PrismaService` 로직을 작성해줍니다.
        ```ts
            // prisma.service.ts
            import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
            import { PrismaClient } from '@prisma/client';

            @Injectable()
            export class PrismaService extends PrismaClient implements OnModuleInit {
                async onModuleInit() {
                    await this.$connect();
                }
                async enableShutDownHooks(app: INestApplication) {
                    this.$on('beforeExit', async () => {
                        await app.close();
                    });
                }
            }
        ```

    4. `PrismaModule` 을 작성해줍니다.
        ```ts
            // prisma.module.ts
            @Global()
            @Module({
                providers: [PrismaService],
                exports: [PrismaService],
            })
            export class PrismaModule {}
        ```
        - `@Global()` 데코레이터를 사용한 모듈에서 export 해주는 것들은 어디서든 의존성 주입을 통해 사용할 수 있습니다. 만약 `@Global()` 데코레이터가 없다면 PrismaService 를 사용할 때마다 해당 service 를 사용하는 곳의 모듈의 import 부분에 일일이 PrismaModule 을 기입해야 합니다... <br/><br/>

    5. 마지막으로 `main.ts` 를 수정해줍니다.
        ```ts
            // main.ts
            async function bootstrap() {
                const app = await NestFactory.create(AppModule);
                const prismaService = app.get(PrismaService);
                await prismaService.enableShutDownHooks(app);
                await app.listen(3000);
            }
            bootstrap();
        ```