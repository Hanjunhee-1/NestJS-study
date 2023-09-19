# 🔔 configuration 에 대해서

- 환경변수를 설정할 때 보통은 `.env` 파일을 활용합니다. prisma 를 사용할 경우 기본으로 env 파일이 생성됩니다.

- env 파일을 사용하면 `process.env.[key]` 형식으로 key 값에 대한 value 값을 사용할 수 있습니다. 

- env 파일을 통한 configuration 말고도 `.yml`, `.json`, `.ts` 등등 여러 파일 형식을 통해 환경변수를 관리하고 설정할 수 있습니다. 