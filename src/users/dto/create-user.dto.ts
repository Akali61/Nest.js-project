import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class SignupUserDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  password!: string;
}