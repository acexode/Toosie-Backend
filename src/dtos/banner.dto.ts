/* eslint-disable prettier/prettier */

import {  IsArray, IsBoolean } from 'class-validator';

export class CreateBannerDTO {

  @IsArray()
  banners: string[];

  @IsArray()
  text: object[];

  @IsBoolean()
  current: boolean;
}
