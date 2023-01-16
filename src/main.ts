import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutDownHooks(app);
  await app.listen(3000);
  logger.log(`Server is running at http://localhost:3000`);
}
bootstrap();
