import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dtos/create-board.dto';

@Injectable()
export class BoardsService {
  // DB 연동 대신 local 에 저장
  private boards: Board[] = [];

  getAllBoard(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException(`${id} 를 가진 게시물을 찾을 수 없습니다 X(`);
    }

    return board;
  }

  deleteBoardById(id: string): void {
    const board = this.getBoardById(id);
    if (board) {
      this.boards = this.boards.filter((board) => board.id !== id);
    }
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
