import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { LoginGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //회원가입 요청 핸들러
  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  //로그인 요청 핸들러 > 유저 검증 수행
  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    if (!req.cookies['login'] && req.user) {
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: true,
        maxAge: 1000 * 100, //10초
      });
    }

    console.log(req.user);
    return res.send(`${req.user}님, 안녕하세요!`);
  }
}
