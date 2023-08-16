# 🔔 migration 과 generate

- migration 은 DB 의 정보가 바뀌는 것을 기록하기 위해 합니다.

- schema.prisma 에서 작성한 DB 정보를 migration 하는 방법은 다음과 같습니다.

    1. 명령어를 통해 migration 을 진행해줍니다.
        ```cmd
            npx prisma migrate dev --name model_create 
        ```
        - `npx prisma migrate dev` 까지는 필수로 입력해야 migration 이 진행됩니다.

        - `--name` 같은 경우에는 해당 작업에 대한 설명을 추가해주는 것입니다. 직접 기입하지 않았더라도 따로 입력할 수 있게 해줍니다. 

        - 이렇게 migration 을 해주었다면 prisma 디렉토리에 migrations 라는 폴더가 새로 생깁니다. 이 폴더에는 `.sql` 파일들이 생기는데 이 파일들을 통해서 DB 의 정보를 기록할 수 있게 되고 혹시나 로컬에서의 DB 정보가 사라졌다고 해도 `npx prisma db pull` 명령어를 통해 이전에 DB 에 기록해두었던 정보를 가져올 수 있습니다.

    2. migration 후에 generate 를 통해 PrismaClient 에 DB 스키마가 변경되었다는 것을 알려줍니다.

        - DB 가 변경되었다면 반드시 generate 를 진행해주어야 에러가 안납니다!

        - 아래의 명령어를 통해 진행해줍니다.
            ```cmd
                npx prisma generate
            ```