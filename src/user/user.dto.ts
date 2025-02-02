import { IsEmail, IsString, Matches } from 'class-validator';

//유저 생성 validation에 사용할 DTO
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}

//유저정보 수정 validation에 사용할 DTO
export class UpdateUserDto {
  @IsString()
  password: string;

  @IsString()
  username: string;
}
