import { Injectable, NotFoundException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Board, BoardStatus, User } from '@prisma/client';
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

  async getBoards(userId: number) {
    let boards: Board[];

    if (userId) {
      boards = await this.prisma.board.findMany({
        where: {
          userId,
        },
      });
    } else {
      boards = await this.prisma.board.findMany({
        include: {
          user: true,
        },
      });
    }
    return boards;
  }

  async getBoardById(id: number) {
    const board: Board = await this.prisma.board.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!board) {
      throw new NotFoundException(
        '해당 id 를 가지는 게시물을 찾을 수 없습니다 X(',
      );
    }

    return board;
  }

  async createBoard(createBoardDto: CreateBoardDto, user: User) {
    const { title, description } = createBoardDto;

    const board: Board = await this.prisma.board.create({
      data: {
        title,
        description,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        user: true,
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

  async deleteBoard(id: number, user: User) {
    const board: Board = await this.getBoardById(id);

    if (board.userId === user.id) {
      await this.prisma.board.delete({
        where: {
          id: board.id,
        },
      });
    } else {
      throw new UnauthorizedException('게시물을 삭제할 권한이 없습니다.');
    }
    // await this.prisma.board.delete({
    //   where: {
    //     id: board.id,
    //   },
    // });

    return 'success';
  }

  async updateBoardStatus(id: number, status: BoardStatus) {
    const board: Board = await this.getBoardById(id);

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
