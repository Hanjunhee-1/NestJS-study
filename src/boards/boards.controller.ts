import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardStatus, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dtos/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private readonly logger = new Logger('BoardsController');
  constructor(private readonly boardsService: BoardsService) {}

  // TEST 용
  @Get('/test')
  test() {
    return this.boardsService.test();
  }
  // TEST 용

  @Get()
  async getBoards(@Query('userId') userId: number) {
    const boards = await this.boardsService.getBoards(+userId);
    return boards;
  }

  @Get(':id')
  async getBoardById(@Param('id', ParseIntPipe) id: number) {
    const board = await this.boardsService.getBoardById(id);
    return board;
  }

  @Post()
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(`${user.name} trying to create new board
    Payload: ${JSON.stringify(createBoardDto)}`);
    const board = await this.boardsService.createBoard(createBoardDto, user);
    return board;
  }

  @Delete(':id')
  async deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    this.logger.verbose(`${user.name} trying to delete board has id: ${id}`);
    const result = await this.boardsService.deleteBoard(id, user);
    return result;
  }

  @Patch(':id')
  async updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    const result = await this.boardsService.updateBoardStatus(id, status);
    return result;
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
