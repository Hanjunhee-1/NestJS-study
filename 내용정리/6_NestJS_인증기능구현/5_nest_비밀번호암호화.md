# 🔔 비밀번호 암호화하기

- 비밀번호 암호화를 위해 `bcryptjs` 라는 패키지를 활용했습니다.
    ```bash
        npm install bcryptjs
    ```
    <br/><br/>

- 어떤 사이트에 회원가입을 할 때를 생각해보면 아이디나 이메일이 겹치는 것에 대해서는 엄중하게 검사하지만 비밀번호가 겹치는 것에 대해 검사하는 것은 검사하는 경우가 거의 없습니다. 이를 생각해보면 비밀번호가 같아도 굳이 상관이 없다는 것입니다. 하지만 비밀번호가 같다면 암호화를 했을 때 동일한 결과가 나오게 될 것입니다. 이렇게 된다면 DB 의 정보가 유출되었을 때 우연히 어느 한 비밀번호에 대해 복호화를 성공한다면 동일한 비밀번호들도 자연스레 뚫리게 되는 것입니다. 이러한 상황을 방지하기 위해 `bcryptjs` 의 `salt` 라는 것을 활용합니다.

- `salt` 는 랜덤으로 생성되는 고유의 문자열을 추가해주는 역할을 합니다.

- Authservice 를 아래와 같이 작성해주었습니다.
    ```ts
        // auth.service.ts
        import * as bcrypt from 'bcryptjs';
        ...
        async createUser(createUserDto: CreateUserDto) {
            const { name, password } = createUserDto;

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            console.log({ name, password, hashedPassword });

            try {
                const user = await this.prisma.user.create({
                    data: {
                        name,
                        password: hashedPassword,
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