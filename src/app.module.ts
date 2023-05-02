import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    BoardsModule,
    PrismaModule,
    AuthModule,
    TasksModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
