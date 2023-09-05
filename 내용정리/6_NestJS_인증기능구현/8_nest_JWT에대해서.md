# 🔔 JWT 에 대해서

- 자세한 것은 공식 사이트에서 확인할 수 있습니다. 

    - https://jwt.io/
    <br/><br/>

- `JWT` 는 JSON Web Token 의 줄임말로 주로 인증에 사용되는 토큰입니다.

- `JWT` 는 다음과 같이 구성되어있습니다.

    1. Header

        - Header 에는 어떤 Hash 알고리즘을 사용하는지 토큰의 타입은 무엇인지에 대한 정보가 담겨있습니다. 토큰의 타입이 JWT 이고 HS256 해시 알고리즘을 사용한다면 Header 는 다음과 같이 표시됩니다. 
            ```json
                {
                    "alg": "HS256",
                    "typ": "JWT"
                }
            ```

    2. Payload

        - Payload 에는 암호화해서 다뤄야할 데이터들을 담습니다. 예를 들면, 토큰이 발급된 시간(iat), 토큰의 만료시간(exp), 토큰 발급자(iss), 사용자 권한(auth) 등등을 저장합니다. 예시는 아래와 같습니다. 
            ```json
                {
                    "iat": "20230113122623",
                    "exp": "20230114000000",
                    "iss": "Hanjunhee-1",
                    "auth": "user"
                }
            ```

    3. Signature

        - Signature 에서는 Header 와 Payload 를 Base64 로 암호화합니다. 암호화할 때 Secret Key 를 설정하게 되는데 해당 Key 를 통해 서버에서 인증받을 수 있습니다. Secret Key 의 경우에는 당연히 서버 측에서 관리해줘야 하고 이것이 노출되면 안됩니다. <br/><br/><br/>


- Header, Payload, Signature 가 암호화되었을 때 JWT 토큰의 예시는 다음과 같습니다. 
    ```
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzMDExMzEyMjYyMyIsImV4cCI6IjIwMjMwMTE0MDAwMDAwIiwiaXNzIjoiSGFuanVuaGVlLTEiLCJhdXRoIjoidXNlciJ9.yJ9AWQCwTvI3RA9TCX_WLn5UBEO8hzYi9u1u1uFFhRg
    ```
    - `NestJS` 를 Secret Key 로 설정한 결과입니다. 

    - `JWT` 토큰을 생성해보고 싶다면 위의 참고 링크를 통해 할 수 있습니다. 

    - `JWT` 를 생성할 때는 Secret Key 를 먼저 입력하고 `secret base64 encoded` 를 체크해야 합니다.