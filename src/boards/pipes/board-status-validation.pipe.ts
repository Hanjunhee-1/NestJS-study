// import {
//   PipeTransform,
//   ArgumentMetadata,
//   BadRequestException,
// } from '@nestjs/common';
// import { BoardStatus } from '../board.model';

// export class BaordStatusValidationPipe implements PipeTransform {
//   readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

//   private isStatusValue(status: any) {
//     const index = this.StatusOptions.indexOf(status);
//     return index !== -1;
//   }

//   transform(value: any, metadata: ArgumentMetadata) {
//     value = value.toUpperCase();

//     if (!this.isStatusValue(value)) {
//       throw new BadRequestException(
//         `${BoardStatus.PRIVATE} 또는 ${BoardStatus.PUBLIC} 으로만 변경가능합니다.`,
//       );
//     }

//     return value;
//   }
// }
