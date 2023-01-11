import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  // bcrypt 복호화 예시
  async logIn(name: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        name,
      },
    });

    const isRight = await bcrypt.compare(password, user.password);

    if (isRight) {
      return user;
    } else {
      return '비밀번호가 잘못되었습니다.';
    }
  }
  // bcrypt 복호화 예시

  async createUser(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log({ name, password, hashedPassword });

    try {
      const user = await this.prisma.user.create({
        data: {
          name,
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      if (error.meta.target === 'User_name_key') {
        throw new ConflictException('해당 name 은 사용할 수 없습니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
