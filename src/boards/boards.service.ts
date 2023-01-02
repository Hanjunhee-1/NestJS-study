import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  // DB 연동 대신 local 에 저장
  private boards = [];

  getAllBoard() {
    return this.boards;
  }
}
