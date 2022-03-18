import { IsOptional } from 'class-validator';
/* eslint-disable prettier/prettier */
import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateProductsDTO {

  @IsString()
  public category: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsNumber()
  public actualPrice: number;

  @IsNumber()
  public discountPercent: number;

  @IsArray()
  @IsOptional()
  public tags: string[];

  @IsString()
  public brand: string;

  @IsArray()
  public resourceImages: string[];

  @IsString()
  public shortSummary: string;

  @IsBoolean()
  public isTrending: boolean;

  @IsBoolean()
  public isSpecial: boolean;

  @IsBoolean()
  public enabled: boolean
}
