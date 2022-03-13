/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

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
}
