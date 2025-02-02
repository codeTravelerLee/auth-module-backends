import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user): Promise<User> {
    const result = await this.userRepository.save(user);
    return result;
  }

  async getUser(email: string): Promise<User | null | undefined> {
    const result = await this.userRepository.findOne({ where: { email } });
    return result;
  }

  async updateUser(_user, email) {
    //기존 userData = user & 업데이트 할 userData = _user
    const user: User | undefined | null = await this.getUser(email);
    if (user) {
      user.username = _user.usernmae;
      user.password = bcrypt.hashSync(_user.password, 10);
      const result = await this.userRepository.save(user);

      return result;
    }
    return '존재하지 않는 유저입니다. 유저 정보를 다시 입력해주세요';
  }

  async deleteUser(email): Promise<DeleteResult> {
    const result = await this.userRepository.delete({ email: email });
    return result;
  }
}
