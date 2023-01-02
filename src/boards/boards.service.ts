import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
  // DB 연동 대신 local 에 저장
  private boards: Board[] = [];

  getAllBoard(): Board[] {
    return this.boards;
  }
}
