import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dtos/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // TEST 용
  @Get('/test')
  test() {
    return this.boardsService.test();
  }
  // TEST 용

  @Get(':id')
  async getBoardById(@Param('id', ParseIntPipe) id: number) {
    const board = await this.boardsService.getBoardById(id);
    return board;
  }

  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    const board = await this.boardsService.createBoard(createBoardDto);
    return board;
  }
  // 아래 부분은 더 이상 사용하지 않음
  // @Get()
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoard();
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  // @Get(':id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  // @Delete(':id')
  // deleteBoardById(@Param('id') id: string): void {
  //   return this.boardsService.deleteBoardById(id);
  // }

  // @Patch(':id')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BaordStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
