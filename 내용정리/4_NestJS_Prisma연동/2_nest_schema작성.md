# 🔔 스키마 파일 작성하기

- prisma 를 설치하면 생성되는 `prisma/schema.prisma` 파일을 작성해볼 것 입니다.

- `schema.prisma` 의 구성은 다음과 같습니다.

    1. `generator`
        
        - generator 는 client 가 어떤 data model 을 기반으로 생성되어야 하는지에 대한 정보를 가집니다.
            ```
                generator client {
                    provider = "prisma-client-js"
                    binaryTargets = ["windows", "darwin"]
                }
            ```
            - `binaryTargets` 는 binary 파일을 다룰 때 macOS 와 windows 간의 차이가 생기는 것을 다루기 위해 따로 추가해주었습니다. <br/><br/>

    2. `datasource`
        
        - datasource 는 DB 와 연동되는 정보를 가집니다. 
            ```
                datasource db {
                    provider = "mysql"
                    url      = env("DATABASE_URL")
                }
            ```
            - `provider` 에 자신이 사용할 DB 의 종류를 써주면 됩니다. ex) postgresql, mysql 등등 <br/><br/>

    3. `model`

        - model 은 DB 에 생성되고 저장될 table 정보입니다. 이렇게 model 을 생성해둔 덕분에 model 정보를 기반으로 prisma 에서 javascript 객체를 만들어주고 service 로직에서 이를 활용하여 DB 작업을 할 수 있게 됩니다.
            ```
                model Board {
                    id              Int         @id @default(autoincrement())
                    title           String      @db.VarChar(255)
                    description     String      @db.VarChar(255)
                    status          BoardStatus @default(PUBLIC)
                }

                enum BoardStatus {
                    PUBLIC
                    PRIVATE
                }
            ```
            - 기존에 사용했던 `src/boards/board.model.ts` 파일의 내용을 통해 model 을 생성해주었습니다.

            - model 생성 문법 간단 설명입니다.

                1. `id` 의 경우 `Primary Key` 로 사용될 것이며 추가될때마다 알아서 카운트 되도록 `@id @default(autoincrement())` 를 추가해주었습니다.

                2. `title` 과 `description` 의 경우 문자열을 저장할 것인데 prisma 자체에서 제공하는 varchar 의 크기는 `191` 이기 때문에 `@db.VarChar(255)` 와 같은 식으로 `Native Type Mapping` 이란 것을 해주었습니다. 

                3. `status` 의 경우 `enum` 형 데이터이기 때문에 `BoardStatus` 라는 enum 을 생성하여 BoardStatus 타입을 가질 수 있도록 해주었습니다. 그리고 기본으로 가지는 값은 `PUBLIC` 이었기 때문에 `@default(PUBLIC)` 을 통해 기본값 설정도 해주었습니다. 

                4. 위의 예시보다 더 자세한 문법(`foreign key`, `N:M 관계`, `table alias 설정` 등등)은 `prisma 공식문서`를 참고해주시면 됩니다. 