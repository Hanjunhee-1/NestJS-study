# 🔔 비밀번호 복호화하기

- DB 에는 암호화하여 저장했지만 실제로 비교를 할 때는 복호화를 하여 진행해주어야 합니다!

- 복호화는 아래와 같이 해줄 수 있습니다. 
    ```ts
        // bcrypt 복호화 예시
        async logIn(name: string, password: string) {
            const user = await this.prisma.user.findUnique({
                where: {
                    name,
                },
            });

            const isRight = await bcrypt.compare(password, user.password);

            if (isRight) {
                return user;
            } else {
                return '비밀번호가 잘못되었습니다.';
            }
        }
    ```
    <br/><br/><br/>

- 만약에 비밀번호를 까먹었을 경우에는 따로 알 방법이 없습니다... 그래서 실제 웹 사이트들을 보면 아이디와 이메일을 동시에 입력받아서 비밀번호를 까먹었을 때는 이메일을 통해 비밀번호를 초기화할 수 있게 해줍니다. 이메일을 통해 본인임을 인증해주기 때문에 보안상으로도 안전합니다. 만약 이것이 좀 귀찮다면 관리자에게 문의하여 관리자가 직접 고쳐주는 방법도 존재합니다. 