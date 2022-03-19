/* eslint-disable prettier/prettier */

import { IsString, IsArray, IsObject, IsNumber } from 'class-validator';

export class CreateOrderDTO {
  @IsString()
  customerId: string;

  @IsString()
  paymentId: string;

  @IsString()
  paymentStatus: string;

  @IsString()
  deliveryStatus: string;

  @IsString()
  paymentMethod: string;

  @IsNumber()
  totalCost: number;

  @IsArray()
  products: string[];

  @IsObject()
  shipping: object;
}
