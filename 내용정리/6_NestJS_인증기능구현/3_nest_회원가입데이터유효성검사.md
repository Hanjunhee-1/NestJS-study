# 🔔 데이터 유효성 검사

- class-validator 를 통해서 데이터의 유효성을 검사하는 코드를 작성했습니다.
    ```ts
        // create-user.dto.ts
        export class CreateUserDto {
            @IsNotEmpty()
            @IsString()
            @MinLength(4)
            @MaxLength(20)
            name: string;

            @IsNotEmpty()
            @IsString()
            @MinLength(4)
            @MaxLength(20)
            @Matches(/^[a-zA-Z0-9]*$/, {
                message: 'password must be in English and number',
            })
            password: string;
        }
    ```