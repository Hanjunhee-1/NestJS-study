import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// 일일이 모듈마다 imports 에 PrismaModule 을 안 적어도 되게 @Global() 을 이용하여
// 해당 모듈을 전역 레벨로 설정
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
