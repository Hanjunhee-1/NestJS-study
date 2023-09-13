# 🔔 요청 시 JWT 의 위치

- 만약 JWT 인증 요청 시 이것을 어디에 넣어서 보내줘야 하는지 처음에 헷갈릴 수도 있습니다.

- 저 같은 경우에는 `PostMan` 이라는 API 테스터를 사용하는데 `Authorization` - `Type:BearerToken` - `Token` 의 위치에 JWT 토큰을 넣어주면 됩니다. 