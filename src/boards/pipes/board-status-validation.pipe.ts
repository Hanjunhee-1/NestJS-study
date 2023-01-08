/* eslint-disable prettier/prettier */
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
