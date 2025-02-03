import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  //회원가입
  async register(userDto: CreateUserDto) {
    const user = await this.userService.getUser(userDto.email);

    //서비스 내에서 한 이메일로는 하나의 계정만 운영 가능
    //회원가입 창에서 입력한 이메일에 매치되는 유저가 이미 있다면 가입 불가
    if (user) {
      throw new HttpException(
        '이미 가입된 유저입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    //가입 가능한 유저라면 -> 비밀번호 암호화
    const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

    //DB저장
    try {
      const user = (await this.userService.createUser({
        ...userDto,
        password: encryptedPassword,
      })) as Partial<CreateUserDto>;

      //DB저장이 성공적으로 수행되면 password를 포함한 모든 user정보가 반환됨
      //보안을 위해 반환된 user의 password를 지워줌
      user.password = undefined;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  //유저 정보 검증
  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser(email);

    if (!user) {
      return null;
    }

    const { password: hashedPassword, ...userInfo } = user;

    if (bcrypt.compareSync(password, hashedPassword)) {
      return userInfo;
    } else {
      return null;
    }
  }
}
