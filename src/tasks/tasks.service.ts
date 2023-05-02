import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { getKST } from './utils/date.util';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  // 스케줄러 사용을 위해 Cron 을 사용할 것입니다.
  // 매 10초마다 실행합니다.
  @Cron(CronExpression.EVERY_10_SECONDS)
  async scheduleJob() {
    const now = getKST();

    const currentPhase = await this.prisma.phase.findFirst({
      where: {
        start: {
          lt: now,
        },
        end: {
          gte: now,
        },
      },
    });

    if (currentPhase) {
      await this.prisma.user.updateMany({
        where: {
          phaseId: currentPhase.id,
        },
        data: {
          testCount: {
            increment: 2,
          },
        },
      });

      const users = await this.prisma.user.findMany();
      console.log(users);
    }
  }
}
