import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;

    try {
      const user = await this.prisma.user.create({
        data: {
          name,
          password,
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
