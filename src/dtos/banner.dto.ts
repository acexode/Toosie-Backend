/* eslint-disable prettier/prettier */

import {  IsArray, IsBoolean } from 'class-validator';

export class CreateBannerDTO {

  @IsArray()
  banners: string[];

  @IsArray()
  textContent: object[];

  @IsBoolean()
  current: boolean;
}
