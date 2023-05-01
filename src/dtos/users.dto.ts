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
export class CreateUserAddressDto {
  @IsString()
  public user: string;

  @IsString()
  public state: string;

  @IsString()
  public localGov: string;

  @IsString()
  public address: string;
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
  public avater: string;

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
export class OTPDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public otp: string;
}
export class ChangePasswordDto {
  @IsEmail()
  public email: string;

  @IsString()
  public oldPassword: string;

  @IsString()
  public newPassword: string;
}
