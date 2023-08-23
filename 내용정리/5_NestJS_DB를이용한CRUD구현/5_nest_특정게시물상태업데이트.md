# 🔔 특정 게시물 상태 업데이트하기

- 게시물의 상태를 업데이트하는 메소드를 prisma API 를 통해 작성했습니다.
    ```ts
        // board-status-validation.pipe.ts
        import { PipeTransform, BadRequestException } from '@nestjs/common';
        import { BoardStatus } from '@prisma/client';

        export class BoardStatusValidationPipe implements PipeTransform {
            readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

            private isStatusValue(status: any) {
                const index = this.StatusOptions.indexOf(status);
                return index !== -1;
            }

            transform(value: any) {
                value = value.toUpperCase();

                if (!this.isStatusValue(value)) {
                    throw new BadRequestException(
                        `${this.StatusOptions.at(0)} 또는 ${this.StatusOptions.at(1)} 으로만 변경가능합니다.`,
                    );
                }

                return value;
            }
        }
    ```
    ```ts
        // boards.service.ts
        async updateBoardStatus(id: number, status: BoardStatus) {
            const board = await this.getBoardById(id);

            await this.prisma.board.update({
                where: {
                    id: board.id,
                },
                data: {
                    status,
                },
            });

            return 'success';
        }
    ```
    ```ts
        // boards.controller.ts
        import { BoardStatus } from '@prisma/client';
        
        ...

        @Patch(':id')
        async updateBoardStatus(
            @Param('id', ParseIntPipe) id: number,
            @Body('status', BoardStatusValidationPipe) status: BoardStatus,
        ) {
            const result = await this.boardsService.updateBoardStatus(id, status);
            return result;
        }
    ```