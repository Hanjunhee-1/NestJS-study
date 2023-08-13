# 🔔 커스텀 Pipe

- Pipe 를 커스텀하여 자신이 원하는대로 데이터의 유효성을 검증할 수 있게 할 수 있습니다.

- 지금 로직에서는 게시물의 상태를 업데이트할 때 `PUBLIC` 이나 `PRIVATE` 로만 변경할 수 있게 되어있는 것이 아니기 때문에 해당 유효성 검증을 위한 커스텀 pipe 를 만들어주었습니다. 
    ```ts
        // board-status-validation.pipe.ts
        export class BaordStatusValidationPipe implements PipeTransform {
            readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

            private isStatusValue(status: any) {
                const index = this.StatusOptions.indexOf(status);
                return index !== -1;
            }

            transform(value: any, metadata: ArgumentMetadata) {
                value = value.toUpperCase();

                if (!this.isStatusValue(value)) {
                throw new BadRequestException(
                    `${BoardStatus.PRIVATE} 또는 ${BoardStatus.PUBLIC} 으로만 변경가능합니다.`,
                );
                }

                return value;
            }
        }
    ```
    - 커스텀 pipe 를 만들어주기 위해서는 PipeTransform 이라는 인터페이스를 상속받아야 합니다.
    - transform() 의 매개변수들 중에서 `value` 는 사용자로부터 넘겨받은 값을 말하고 `metadata` 는 인자에 대한 `metadata` 를 말합니다.
        - 사용자가 `{ "status": "private" }` 를 넘겨줬을 경우 `value` 는 `private` 가 되는 것이고 `metadata` 는 `{ type: "body", data: "status", metatype [Function: String] }` 이 됩니다. <br/><br/><br/>

- 이제 해당 커스텀 pipe 가 필요한 컨트롤러에 추가해주면 됩니다.
    ```ts
        // boards.controller.ts
        @Patch(':id')
        updateBoardStatus(
            @Param('id') id: string,
            @Body('status', BaordStatusValidationPipe) status: BoardStatus,
        ) {
            return this.boardsService.updateBoardStatus(id, status);
        }
    ```
    - 위의 방식은 `Parameter-level` 의 pipe 사용방식입니다. 