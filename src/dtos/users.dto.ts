import { IsEmail, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public fullName: string;

  @IsString()
  public phone: string;
}
export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  public email: string;

  @IsString()
  @IsOptional()
  public password: string;

  @IsString()
  @IsOptional()
  public fullName: string;

  @IsString()
  @IsOptional()
  public phone: string;

  @IsString()
  @IsOptional()
  public isActivated: string;

  @IsString()
  @IsOptional()
  public userType: string;

  @IsString()
  @IsOptional()
  public resetToken: string;

  @IsObject()
  @IsOptional()
  public address: object;
}

export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
