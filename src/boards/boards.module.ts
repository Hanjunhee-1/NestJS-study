import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  // Prisma 를 통한 CRUD 작업을 위해 꼭 필요함.
  // JWT 토큰 기반 인증을 위해 AuthModule 추가
  imports: [AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
