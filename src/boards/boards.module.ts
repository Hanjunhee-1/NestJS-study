import { Module } from '@nestjs/common';
// TEST
import { PrismaModule } from 'src/prisma/prisma.module';
// TEST
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  // TEST - Prisma 를 통한 CRUD 작업을 위해 꼭 필요함.
  imports: [PrismaModule],
  // TEST
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
