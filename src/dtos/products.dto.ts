/* eslint-disable prettier/prettier */
import { IsArray, IsBoolean, IsNumber, IsString, IsOptional } from "class-validator";

export class CreateProductsDTO {

  @IsString()
  public category: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public ingredients: string;

  @IsString()
  public warning: string;

  @IsNumber()
  public actualPrice: number;

  @IsNumber()
  public discountPercent: number;

  @IsNumber()
  public stock: number;

  @IsArray()
  @IsOptional()
  public tags: string[];

  @IsString()
  public brand: string;

  @IsArray()
  public resourceImages: string[];

  @IsBoolean()
  public isTrending: boolean;

  @IsBoolean()
  public isSpecial: boolean;

  @IsBoolean()
  public enabled: boolean
}
