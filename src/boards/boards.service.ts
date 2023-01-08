import { Injectable, NotFoundException } from '@nestjs/common';
// import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoardDto } from './dtos/create-board.dto';

@Injectable()
export class BoardsService {
  // DB 연동 대신 local 에 저장 (더 이상 사용하지 않음)
  // private boards: Board[] = [];

  // TEST 용
  constructor(private readonly prisma: PrismaService) {}

  async test() {
    return await this.prisma.board.findUnique({
      where: {
        id: 1,
      },
    });
  }
  // TEST 용

  async getBoardById(id: number) {
    const board = this.prisma.board.findUnique({
      where: {
        id,
      },
    });

    if (!board) {
      throw new NotFoundException(
        '해당 id 를 가지는 게시물을 찾을 수 없습니다 X(',
      );
    }

    return board;
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;

    const board = await this.prisma.board.create({
      data: {
        title,
        description,
      },
    });
    return board;

    // 추가 - 이런 방식도 있는데 return 값이 원하는대로(API 문서대로) 나오지 않을 듯...
    // const board: Prisma.BoardUncheckedCreateInput = {
    //   title,
    //   description,
    // };

    // // await this.prisma.board.create({ data: board });
    // return board;
  }

  // 아래 부분은 더 이상 사용하지 않음.
  // getAllBoard(): Board[] {
  //   return this.boards;
  // }

  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };

  //   this.boards.push(board);
  //   return board;
  // }

  // getBoardById(id: string): Board {
  //   const board = this.boards.find((board) => board.id === id);

  //   if (!board) {
  //     throw new NotFoundException(`${id} 를 가진 게시물을 찾을 수 없습니다 X(`);
  //   }

  //   return board;
  // }

  // deleteBoardById(id: string): void {
  //   const board = this.getBoardById(id);
  //   if (board) {
  //     this.boards = this.boards.filter((board) => board.id !== id);
  //   }
  // }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
