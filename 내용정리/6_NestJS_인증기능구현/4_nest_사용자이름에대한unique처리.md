# 🔔 unique 키 설정

- 현재 로직의 회원가입에서는 동일한 이름으로 회원가입을 해도 DB 에 그대로 입력이 된다는 것입니다. 보통의 경우는 nickname 이 다른 사람들과 겹치지 않도록 되어있기 때문에 이를 해결하기 위해 아래의 2가지 방법 중 하나를 사용해야 합니다.

    1. 회원가입을 하려고 할 때 해당 이름을 가지는 user 가 존재하면 예외처리를 해줍니다.

    2. User 테이블의 name 컬럼에 unique 설정을 해주고 회원가입 시 unique 를 지키지 않아 생긴 에러에 대한 예외처리를 해줍니다. -> 이 방법이 1번보다 더 안전하다고 볼 수 있을 것 같습니다. <br/><br/>

- 우선 schema.prisma 의 User model 을 수정해주었습니다. 
    ```
        // schema.prisma
        model User {
            id              Int         @id @default(autoincrement())
            name            String      @db.VarChar(255)  @unique
            password        String      @db.VarChar(255)
        }
    ```
    <br/><br/>

- 그리고 service 도 수정해주었습니다. 
    ```ts
        // auth.service.ts
        async createUser(createUserDto: CreateUserDto) {
            const { name, password } = createUserDto;

            try {
            const user = await this.prisma.user.create({
                data: {
                    name,
                    password,
                },
            });

            return user;
            } catch (error) {
                if (error.meta.target === 'User_name_key') {
                    throw new ConflictException('해당 name 은 사용할 수 없습니다.');
                } else {
                    throw new InternalServerErrorException();
                }
            }
        }
    ```
    - catch 문의 target 같은 것들은 Prisma 에서 제공해주는 것을 활용한 방법입니다. 