# 🔔 사용자와 게시물의 관계

- 게시물에 대한 모델을 작성하기 전에 데이터베이스의 관계에 대해 알아보겠습니다.

- 데이터베이스에서 관계는 4가지가 존재합니다.

    1. `1:1`

        - 테이블 간의 관계에서 오직 한 row 끼리만 참조 관계가 형성될 수 있습니다. 예를 들어, user 테이블과 profile 테이블이 있다고 하면 사용자는 `오직 자신만의 profile` 을 가질 수 있습니다. A 사용자가 B 사용자의 profile 을 가질 수 없는 것을 생각하면 쉽게 이해됩니다.

    2. `1:N`

        -  테이블 간의 관계에서 한 row 가 다른 테이블의 여러 row 를 가질 수 있습니다. 예를 들어, user 테이블과 board 테이블이 있다고 하면 사용자는 여러 개의 게시물을 작성할 수 있으므로 이는 `1(사용자):N(게시물)` 의 관계가 되어야 합니다. 

    3. `M:1`

        - (2) 의 경우와 같은데 관점만 달라진 것입니다.

    4. `M:N`

        - 테이블 간의 관계에서 여러 row 가 다른 테이블의 여러 row 와 참조관계를 가지는 형태입니다. 예를 들면, 1명의 학생이 여러 수업을 들을 수 있고, 1개의 수업은 여러 학생을 수용할 수 있는 관계를 생각해보면 됩니다. 잘 생각해보면 `1:N`, `M:1` 의 관계가 합쳐져서 생긴 것이 `M:N` 관계라는 것을 알 수 있습니다. 이 경우에는 다른 경우들과 다르게 관계를 위한 테이블을 새로 생성하여 `M:N` 관계를 나타내줍니다. <br/><br/><br/>


- 이제 위의 것을 참고하여 Board 모델을 작성해줍니다.
    ```
        // schema.prisma
        model User {
            id              Int         @id @default(autoincrement())
            name            String      @db.VarChar(255)  @unique
            password        String      @db.VarChar(255)

            boards          Board[]
        }

        model Board {
            id              Int         @id @default(autoincrement())
            title           String      @db.VarChar(255)
            description     String      @db.VarChar(255)
            status          BoardStatus @default(PUBLIC)
            user            User?       @relation(fields: [userId], references: [id], onDelete: SetNull)
            userId          Int?
        }
    ```

    - 게시물에 대한 `onDelete` 설정은 실제 서비스를 생각해보았을 때 작성자가 탈퇴를 하더라도 게시물의 정보는 일정 기간동안 남아있게 되므로 userId 가 없어지더라도 null 로 설정하여 기록을 남겨준 것입니다.  
