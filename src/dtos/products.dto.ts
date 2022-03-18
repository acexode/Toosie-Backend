/* eslint-disable prettier/prettier */
import { IsBoolean, IsString } from "class-validator";

export class CreateProductsDTO {
  @IsString()
  public _id: string

  @IsString()
  public category: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public actualPrice: number;

  @IsString()
  public discountPercent: number;

  @IsString()
  public tags: string[];

  @IsString()
  public brand: string;

  @IsString()
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
