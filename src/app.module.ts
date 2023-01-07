import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BoardsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
